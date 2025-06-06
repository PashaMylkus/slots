import { Assets, Container, TilingSprite } from "pixi.js";
import { IScene } from "@/interfaces/scene.interface";
import menuBackgroundUrl from "@/static/assets/main-bg.png";
import { SlotReels, SpinButton, SpinCounter } from "@/core/Dispaly";
import { generateSpinResult } from "@/api/test-api";

/**
 * MainScene — the main game scene for the slot machine.
 *
 * Responsibilities:
 * - Loads and displays the background.
 * - Initializes and positions the reels (SlotReels), spin button (SpinButton), and spin counter (SpinCounter).
 * - Handles the Spin button click: starts the spin animation, increments the spin counter, highlights win lines, and disables/enables the button during animation.
 * - Adapts layout on window resize.
 *
 * Key methods:
 * - constructor: creates all components and sets up layout and resize handling.
 * - loadBackground: asynchronously loads and sets the background image.
 * - layout: positions all UI elements on the scene.
 * - startGame: triggers a spin, disables the button, increments the counter, highlights win lines, and re-enables the button after animation.
 * - resize: resizes the background to fit the window.
 */
export class MainScene extends Container implements IScene {
  private background: TilingSprite;
  private reels: SlotReels;
  private spinButton: SpinButton;

  private spinCounter: SpinCounter;

  constructor() {
    super();

    this.loadBackground();

    this.background = new TilingSprite();

    this.spinCounter = new SpinCounter(window.innerWidth);
    this.addChild(this.spinCounter);
    this.spinCounter.y = 20;

    this.reels = new SlotReels();
    this.addChild(this.reels);

    this.spinButton = new SpinButton(() => this.startGame());
    this.addChild(this.spinButton);

    this.layout();
    window.addEventListener("resize", () => this.layout());
  }
  private async loadBackground() {
    const texture = await Assets.load(menuBackgroundUrl);
    this.background = new TilingSprite(texture);
    this.addChildAt(this.background, 0);
    this.resize;
  }

  private layout() {
    this.reels.x = (window.innerWidth - this.reels.width) / 2;
    this.reels.y = (window.innerHeight - this.reels.height) / 2 - 50;

    this.spinButton.x = (window.innerWidth - this.spinButton.width) / 2;
    this.spinButton.y = this.reels.y + this.reels.height + 30;
  }
  startGame() {
    this.spinCounter.increment();
    this.spinButton.setEnabled(false);
    const result = generateSpinResult();
    this.reels.clearHighlights();
    this.reels.spin(result.matrix, () => {
      if (result.winLines) {
        this.reels.highlightWinLines(result.winLines);
      }
      this.spinButton.setEnabled(true);
    });
  }
  update(_delta: number): void {}

  resize(screenWidth: number, screenHeight: number): void {
    this.background.width = screenWidth;
    this.background.height = screenHeight;
  }
}
