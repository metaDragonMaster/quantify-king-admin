import pluginInstall from "./plugins";
import { createApp } from "vue";
import AppElement from "./App.vue";

let app;

async function render(props = {}) {
  const { container } = props;
  app = createApp(AppElement);
  app.use(pluginInstall);
  app.mount(container ? container.querySelector("#app") ?? "#app" : "#app");
  return app;
}

render();