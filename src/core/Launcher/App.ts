import { Application } from "pixi.js";
import { SceneManager } from "@/core/Managers";
import { InitialScene, MainScene } from "../Scenes";
import { theme } from "@/config";
import { initDevtools } from "@pixi/devtools";

export class App {
  private readonly app: Application;
  private readonly scene: SceneManager;

  constructor() {
    this.app = new Application();
    this.scene = new SceneManager();

    this.scene.setApplication(this.app);

    // Expose the application globally for debugging purposes.
    // @ts-ignore
    globalThis.__PIXI_APP__ = this.app;

    initDevtools({
      app: this.app,
    });

    this.app
      .init({
        width: window.innerWidth,
        height: window.innerHeight,
        autoDensity: true,
        background: theme.background.primary,
        resolution: window.devicePixelRatio || 1,
      })
      .then(() => {
        document.body.appendChild(this.app.canvas);
        this.app.ticker.add((ticker) => {
          return this.loop(ticker.deltaTime);
        });
        //Change to InitialScene if you want to start with a loading screen
        this.scene.changeScene(MainScene);
      });
  }

  loop(delta: number) {
    this.scene.update(delta);
  }
}
