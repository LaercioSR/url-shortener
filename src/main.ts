import { App } from "./infrastructure/http/server/App";

export const app = new App();
app.startServer();
