import { Container, Text } from "pixi.js";
import { CircularProgressBar } from "@pixi/ui";
import { GameManager, SceneManager } from "@/core/Managers";
import { theme } from "@/config";
import { IScene } from "@/interfaces/scene.interface";
import { MainScene } from "@/core/Scenes";
/**
 * InitialScene — the loading (splash) scene for the slot machine game.
 *
 * Responsibilities:
 * - Displays a circular progress bar and loading text while resources are being loaded.
 * - Handles the loading animation and updates the progress bar.
 * - Switches to the MainScene after all assets are loaded.
 * - Adapts loader and text position on window resize.
 *
 * Key methods:
 * - constructor: sets up loader UI and starts resource loading.
 * - renderLoader: creates and positions the circular progress bar.
 * - renderLoaderText: creates and positions the loading text.
 * - initializeResourceLoader: (placeholder) for loading resources asynchronously.
 * - assetsLoaded: switches to MainScene after loading is complete.
 * - update: animates the loader and updates progress.
 * - resize: repositions loader and text on window resize.
 */
export class InitialScene extends Container implements IScene {
  private game: GameManager = new GameManager();
  private scene: SceneManager = new SceneManager();

  private loaderValue = 0;
  private isFilling: Boolean = true;

  private text!: Text;
  private loader!: CircularProgressBar;

  constructor() {
    super();

    this.renderLoader();
    this.renderLoaderText();

    this.initializeResourceLoader().then(() => {
      this.assetsLoaded();
    });
  }

  private renderLoaderText() {
    this.text = new Text();
    this.text.text = "Loading...";
    this.text.x = this.game.size.getWidth() / 2 - 64;
    this.text.y = this.game.size.getHeight() / 2 + 55;

    this.addChild(this.text);
  }

  private renderLoader() {
    this.loader = new CircularProgressBar({
      backgroundColor: theme.background.secondary,
      backgroundAlpha: 0.4,
      lineWidth: 12,
      fillColor: theme.text.tertiary,
      fillAlpha: 0.7,
      radius: 40,
      value: 0,
      cap: "round",
    });

    this.loader.x = this.game.size.getWidth() / 2;
    this.loader.y = this.game.size.getHeight() / 2;

    this.addChild(this.loader);
  }

  private async initializeResourceLoader(): Promise<void> {
    // const loader = new ResourceLoader();
    // await loader.load();
  }

  private assetsLoaded(): void {
    this.scene.changeScene(MainScene);
  }

  update(_framesPassed: number): void {
    this.isFilling ? this.loaderValue++ : this.loaderValue--;
    if (this.loaderValue >= 100) {
      this.isFilling = false;
    } else if (this.loaderValue <= 0) {
      this.isFilling = true;
    }

    this.loader.progress = this.loaderValue;
    this.loader.rotation += 0.1;
  }

  resize(_screenWidth: number, _screenHeight: number): void {
    this.loader.x = _screenWidth / 2;
    this.loader.y = _screenHeight / 2;

    this.text.x = _screenWidth / 2 - 64;
    this.text.y = _screenHeight / 2 + 55;
  }
}
