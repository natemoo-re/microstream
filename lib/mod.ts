import type { ServeInit } from "https://deno.land/std@0.139.0/http/server.ts";
import { serve } from "https://deno.land/std@0.139.0/http/server.ts";
import { unique } from './shorthash.ts'
import "./jsx.d.ts";

declare class FetchEvent extends Event {
  request: Request;
  respondWith(response: Response | Promise<Response>): void;
}

export interface PageContext {
  request: Request;
  response: Response;
  params: Record<string, string>;
}
export interface FunctionalComponent<Props extends Record<string|number|symbol, any> = Record<string|number|symbol, any>> {
  (props: Props & { children?: any }): any;
}

interface AppRoute {
  type: 'page' | 'endpoint';
  pathname: string;
  fileURL: URL;
  pattern: URLPattern;
  score: number;
  depth: number;
}
interface AppManifest {
  routes: AppRoute[];
}

export interface AppOptions {
  root: string;
  serve?: ServeInit;
}

export class App {
  #opts: AppOptions;
  #manifest!: AppManifest;
  #init: Promise<void>;

  constructor(opts: AppOptions) {
    this.#opts = opts;
    let ready: () => void;
    this.#init = new Promise((resolve) => {
      ready = resolve;
    })
    this.#createManifest().then((manifest) => {
      ready();
      this.#manifest = manifest;
    });
  }

  async #createManifest(): Promise<AppManifest> {
    const pages = new URL('./pages', this.#opts.root);
    const manifest: AppManifest = { routes: [] };
    async function collect(ent: Deno.DirEntry, root: URL = pages) {
      const fileURL = new URL(ent.name, root + '/');
      if (ent.isDirectory) {
        for await (const e of Deno.readDir(fileURL)) {
          await collect(e);
        }
      } else if (ent.isFile) {
        const type = fileURL.pathname.endsWith('.tsx') ? 'page' : 'endpoint';
        const pathname = fileURL.pathname.slice(pages.pathname.length).split('.').slice(0, -1).join('.');
        const patternPathname = pathname.replace(/\[\.\.\.(.+)\]/, ':$1*').replace(/\[(.+)\]/g, ':$1').replace(/index$/, '');
        const segments = patternPathname.split('/').slice(1);
        const score = segments.map((segment, i) => segment.startsWith(':') ? segment.endsWith('*') ? Infinity : i + 1 : 0).reduce((a, b) => a + b, 0);
        let depth = segments.length - 1;
        if (patternPathname.endsWith('*')) {
          depth = Infinity;
        }
        const pattern = new URLPattern({ pathname: patternPathname });
        manifest.routes.push({ pathname, fileURL, pattern, type, depth, score });
      }
    }
    for await (const e of Deno.readDir(pages)) {
      await collect(e);
    }
    return manifest;
  }

  #match(url: URL) {
    const matches: AppRoute[] = [];
    const pathname = url.pathname.replace(/index$/, '');
    const depth = url.pathname.split('/').length - 2;
    for (const r of this.#manifest.routes) {
      if (depth > r.depth) continue;
      if (r.pattern.test({ pathname })) {
        matches.push(r);
      }
    }
    if (matches.length === 1) {
      const route = matches[0];
      return { route, params: route.pattern.exec({ pathname })!.pathname.groups }
    }
    const route = matches.sort(({ score: a }, { score: b }) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })[0];
    
    if (!route) return;
    return { route, params: route.pattern.exec({ pathname })!.pathname.groups };
  }

  async #notFoundResponse(request: Request) {
    const url = new URL(request.url);
    url.pathname = '/404'
    const { route, params } = this.#match(url) ?? {};
    if (!route) {
      return new Response('<h1>Not found!</h1>', {
        status: 404,
        statusText: 'Not Found',
        headers: {
          'Content-Type': 'text/html'
        }
      });
    }

    const Component = await import(route.fileURL.toString()).then(res => res.default);
    if (typeof Component !== 'function') {
      throw new Error(`Matched ${route.fileURL} but there is no default export!`)
    }
    const context: PageContext = { request, response: new Response(), params: params! }
    return new Response(renderToStream(Component(context)), {
      status: 404,
      statusText: 'Not Found',
      headers: {
        'Content-Type': 'text/html'
      }
    });
  }

  async #isAssetRequest(request: Request): Promise<URL | undefined> {
    const fileURL = new URL('./public/' + new URL(request.url).pathname, this.#opts.root);
    try {
      await Deno.readFile(fileURL)
      return fileURL;
    } catch (_e) {
      // ignored
    }
  }

  async render(request: Request, { signal }: { signal?: AbortSignal } = {}): Promise<Response> {
    const { route, params } = this.#match(new URL(request.url)) ?? {};
    if (!route) {
      return this.#notFoundResponse(request);
    }
    const response = new Response();
    const Component = await import(route.fileURL.toString()).then(res => res.default);
    if (typeof Component !== 'function') {
      throw new Error(`Matched ${route.fileURL} but there is no default export!`)
    }
    const context: PageContext = { request, response, params: params! }
    const content = await Component(context);

    if (route.type === 'page') {
      response.headers.append('Content-Type', 'text/html');
    }
    return new Response(renderToStream(content, { signal }), response);
  }

  async #handleRequest(request: Request) {
    const asset = await this.#isAssetRequest(request);
    if (asset) {
      return await fetch(asset.toString());
    }
    const response = await this.render(request);
    return response;
  }

  async listen() {
    await this.#init;
    return serve(this.#handleRequest.bind(this), this.#opts.serve);
  }
}

export function definePage(Component: FunctionalComponent<PageContext>, options = {}) {
  (Component as any).options = options;
  return Component;
}

const decoder = new TextDecoder();

async function* render(child: unknown): any {
  child = await child;
  if (typeof child === 'string') {
    yield child;
  } else if (Array.isArray(child)) {
    for (const c of child) {
      yield* render(c);
    }
  } else if (child instanceof Response) {
    yield await child.text();
  } else if (child instanceof ReadableStream) {
    const reader = child.getReader();
    let res = await reader.read();
    while (!res.done) {
      yield decoder.decode(res.value);
      res = await reader.read()
    }
  } else if (isIterable(child) || isAsyncIterable(child)) {
    for await (const c of child) {
      yield* render(c);
    }
  } else if (typeof child === 'function') {
    if ((child as any)[Defer]) {
      yield child;
    } else {
      yield* render(child());
    }
  } else if (!child && child !== 0) {
    // noop
  } else {
    yield child;
  }
}

const VOID_ELEMENT_NAMES = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const HTML_BOOLEAN_ATTRIBUTES = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const HTML_ENUM_ATTRIBUTES = /^(contenteditable|draggable|spellcheck|value)$/i;
const SVG_ENUM_ATTRIBUTES = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;

const toAttributeString = (value: any) => String(value).replace(/&/g, '&#38;').replace(/"/g, '&#34;');

// A helper used to turn expressions into attribute key/value
function toAttribute(key: string, value: any) {
	if (value == null) {
		return '';
	}

	if (value === false) {
		if (HTML_ENUM_ATTRIBUTES.test(key) || SVG_ENUM_ATTRIBUTES.test(key)) {
			return ` ${key}="false"`;
		}
		return '';
	}

	// Boolean values only need the key
	if (value === true && (key.startsWith('data-') || HTML_BOOLEAN_ATTRIBUTES.test(key))) {
		return ` ${key}`;
	} else {
		return ` ${key}="${toAttributeString(value)}"`;
	}
}

function toAttributes(values: Record<any, any>) {
	let output = '';
	for (const [key, value] of Object.entries(values)) {
		output += toAttribute(key, value);
	}
	return output;
}

export function Fragment(props: Record<string|number|symbol, any>) {
  return props.children;
}

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
const Min = Symbol('min');
const Defer = Symbol('defer');

export class TimeoutError extends Error {}

async function createDeferred(userPromise: Promise<any>, { min, max }: { min: number, max: number }) {
  const timein = () => sleep(min).then(() => Min);
  const timeout = () => sleep(max).then(() => { throw new TimeoutError() });
  
  const result = await Promise.race([timein(), userPromise]).catch(error => userPromise.catch(error).then(({ raw }) => raw));
  if (result === Min) {
    const deferred = () => Promise.race([timeout(), userPromise]).then(({ script }) => script).catch(async (error) => {
      const result = await userPromise.catch(error);
      return result.script;
    });
    (deferred as any)[Defer] = true;
    return deferred;
  } else {
    return result.raw;
  }
}

export async function Await(props: Record<string|number|symbol, any>) {
  const id = unique(crypto.randomUUID());
  const placeholder = props.children.find((child: any) => child?.tag === Placeholder);
  const then = props.children.find((child: any) => child?.tag === Then);
  const _catch = props.children.find((child: any) => child?.tag === Catch);

  const wrapper = (p: Promise<any>) => p.then((...result) => then({ result, id })).catch((error: Error) => _catch({ error, id }));
  const deferred = await createDeferred(wrapper(props.bind), { min: 20, max: props.timeout ?? 5000 });

  if (typeof deferred === 'function') {
    return [placeholder({ id }), deferred];
  }

  return deferred;
}

export function Placeholder(props: Record<string|number|symbol, any>, { id }: any) {
  return html`<html-fragment style="display:contents" id="${id}"><template></template>${props.children}</html-fragment>`;
}

export async function Then({ children }: Record<string|number|symbol, any>, { result, id }: any) {
  let child: string;
  if (children.length === 1 && typeof children[0] === 'function') {
    child = await render(children[0](...result));
  } else {
    child = await render(html`${children}`);
  }
  const text = await renderToString(child);

  return { raw: text, script: html`<script id="script-${id}">
    (() => {
      const self = document.getElementById("script-${id}");
      const fragment = document.getElementById("${id}");
      const template = fragment.firstElementChild;
      template.innerHTML = ${JSON.stringify(text)};
      fragment.replaceWith(template.content.cloneNode(true));
      self.remove();
    })()
  </script>` };
}

export async function Catch({ children }: { children?: (error: Error) => any }, { error, id }: any) {
  let child: string;
  if ((children as any).length === 1 && typeof (children as any)[0] === 'function') {
    child = await render((children as any)[0](error));
  } else {
    child = await render(html`${children}`);
  }
  const text = await renderToString(child);

  return { raw: text, script: html`<script id="script-${id}">
    (() => {
      const self = document.getElementById("script-${id}");
      const fragment = document.getElementById("${id}");
      const template = fragment.firstElementChild;
      template.innerHTML = ${JSON.stringify(text)};
      fragment.replaceWith(template.content.cloneNode(true));
      self.remove();
    })()
  </script>` };
}

export const use = {
  await: Await,
  placeholder: Placeholder,
  then: Then,
  catch: Catch,
}

export const createInclude = (importMetaURL: string) => ({ src }: { src: string }) => {
  const fileURL = typeof src === 'string' ? new URL(src, importMetaURL) : src;
  return fetch(fileURL.toString());
};

export function h(tag: any, props: Record<string|number|symbol, any>, ...children: any[]) {
  const c = { children, ...props }.children ?? null;
  if (typeof tag === 'string') {
    const attrStr = toAttributes(props ?? {});
    if (VOID_ELEMENT_NAMES.test(tag)) {
      return html`<${tag}${attrStr}>`;
    }
    return html`<${tag}${attrStr}>${c}</${tag}>`;
  }
  if ([Await, Placeholder, Then, Catch].includes(tag)) {
    const child = tag.bind(null, { children, ...props });
    child.tag = tag;
    return child;
  }
  return html`${tag({ children, ...props })}`;
}

export async function* html(
  parts: TemplateStringsArray,
  ...expressions: unknown[]
) {
  for (let i = 0; i < parts.length; i++) {
    yield parts[i];
    yield render(expressions[i]);
  }
}

const isIterable = (obj: any): obj is Iterable<any> => obj?.[Symbol.iterator];
const isAsyncIterable = (obj: any): obj is AsyncIterable<any> => obj?.[Symbol.asyncIterator];

export interface RenderToStreamOptions {
  delay?: number;
  signal?: AbortSignal;
}
export function renderToStream(Component: any, options: RenderToStreamOptions = {}) {
  let aborted = false;
  const encoder = new TextEncoder();
  const queue: Promise<any>[] = [];

  const stream = new ReadableStream({
    async pull(controller) {
      for await (const value of render(Component)) {
        if (aborted) break;
        if (value[Defer]) {
          const promise = value();
          queue.push(promise.then(async (res: any) => {
            if (aborted) return;
            let text = '';
            for await (const chunk of render(res)) {
              if (aborted) return;
              text += chunk;
            }
            controller.enqueue(encoder.encode(text));
          }));
        } else {
          if (aborted) break;
          controller.enqueue(encoder.encode(value));
          if (typeof options.delay === 'number') {
            await sleep(options.delay);
          }
        }
      }
      await Promise.all(queue);
      controller.close();
    },
    cancel() {
      aborted = true;
    },
  });
  if (options && options.signal) {
    const signal = options.signal;
    const listener = () => {
      aborted = true;
      stream.cancel();
      signal.removeEventListener('abort', listener);
    };
    signal.addEventListener('abort', listener);
  }
  return stream;
}

export async function renderToString(Component: any) {
  const stream = renderToStream(Component);
  const res = new Response(stream);
  return await res.text();
}
