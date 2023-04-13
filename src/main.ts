import { createSSRApp } from "vue";
import uView from "uview-ui";
import App from "./App.vue";
import * as Pinia from 'pinia'
export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  return {
    app,
	Pinia,
  };
}
