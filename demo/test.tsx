import { h, Fragment, createInclude, renderToString } from './mod.ts';

const Include = createInclude(import.meta.url);

const App = () => (
    <>
        <h1>Hello world!</h1>
        <Include src="./partial.html" />
    </>
)

console.log(await renderToString(<App />));
