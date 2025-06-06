import { Container, Graphics, Text, TextStyle, Ticker } from "pixi.js";
/**
 * SlotCell — visual component representing a single cell (symbol) on a slot reel.
 *
 * Responsibilities:
 * - Renders the symbol with background, color, and label.
 * - Supports highlighting (for win) with color and pulse animation.
 * - Handles updating its symbol and label.
 *
 * Key methods:
 * - highlightBorder: highlights the cell with a colored background and starts a pulse animation.
 * - clearHighlight: removes highlight and stops the pulse animation.
 * - setSymbol: updates the symbol's color and label.
 */
export class SlotCell extends Container {
  private bg: Graphics;
  private symbol: Graphics;
  private text: Text;
  private slotWidth: number;
  private slotHeight: number;
  private padding: number = 6;

  private pulseTicker?: Ticker;
  private pulseTime: number = 0;

  constructor(color: number, label: string, width: number, height: number) {
    super();

    this.slotWidth = width;
    this.slotHeight = height;

    this.bg = new Graphics()
      .roundRect(0, 0, width, height, 20)
      .fill({ color: 0x000000, alpha: 0 });
    this.addChild(this.bg);

    this.symbol = new Graphics()
      .roundRect(
        this.padding,
        this.padding,
        width - 2 * this.padding,
        height - 2 * this.padding,
        16
      )
      .fill({ color });

    this.text = new Text({
      text: label,
      style: new TextStyle({
        fill: "#fff",
        fontSize: 48,
        fontWeight: "bold",
      }),
    });
    this.text.anchor.set(0.5);
    this.text.x = width / 2;
    this.text.y = height / 2;

    this.pivot.set(this.slotWidth / 2, this.slotHeight / 2);
    this.position.set(this.slotWidth / 2, this.slotHeight / 2);

    this.symbol.addChild(this.text);
    this.addChild(this.symbol);
  }

  public highlightBorder(color = 0xffd700) {
    this.bg
      .clear()
      .roundRect(0, 0, this.slotWidth, this.slotHeight, 20)
      .fill({ color });
    this.startPulse();
  }

  public clearHighlight() {
    this.bg
      .clear()
      .roundRect(0, 0, this.slotWidth, this.slotHeight, 20)
      .fill({ color: 0x000000, alpha: 0 });
    this.stopPulse();
    this.scale.set(1, 1);
  }

  private startPulse() {
    this.stopPulse();
    this.pulseTime = 0;
    this.pulseTicker = new Ticker();
    this.pulseTicker.add(() => {
      this.pulseTime += 0.1;
      const scale = 1 + Math.sin(this.pulseTime * 2) * 0.05;
      this.scale.set(scale, scale);
    });
    this.pulseTicker.start();

    setTimeout(() => {
      this.stopPulse();
      this.scale.set(1, 1);
    }, 500);
  }

  private stopPulse() {
    if (this.pulseTicker) {
      this.pulseTicker.stop();
      this.pulseTicker.destroy();
      this.pulseTicker = undefined;
    }
  }

  public setSymbol(color: number, label: string) {
    this.symbol
      .clear()
      .roundRect(
        this.padding,
        this.padding,
        this.slotWidth - 2 * this.padding,
        this.slotHeight - 2 * this.padding,
        16
      )
      .fill({ color });
    this.text.text = label;
  }
}
