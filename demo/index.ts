import { App } from "../lib/mod.ts";

const app = new App({
    root: import.meta.url
});

app.listen();
