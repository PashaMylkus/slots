import { Container, Text, TextStyle } from "pixi.js";

export class SpinCounter extends Container {
  private counter: number = 0;
  private text: Text;

  constructor(width: number) {
    super();

    this.text = new Text({
      text: `Spins: 0`,
      style: new TextStyle({
        fill: "#fff",
        fontSize: 32,
        fontWeight: "bold",
        align: "center",
      }),
    });
    this.text.anchor.set(0.5, 0);
    this.text.x = width / 2;
    this.text.y = 0;

    this.addChild(this.text);
  }

  public increment() {
    this.counter++;
    this.text.text = `Spins: ${this.counter}`;
  }

  public reset() {
    this.counter = 0;
    this.text.text = `Spins: 0`;
  }
}
