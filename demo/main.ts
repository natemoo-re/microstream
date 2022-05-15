import { App } from "microstream";

const app = new App({
    root: import.meta.url
});

await app.listen();
