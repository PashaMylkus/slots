import { ButtonContainer } from "@pixi/ui";
import { Container, Graphics, Text, TextStyle } from "pixi.js";

export class SpinButton extends ButtonContainer {
  private buttonBg: Graphics;

  constructor(onClick: () => void, width = 200, height = 60) {
    super();

    const buttonView = new Container();
    this.buttonBg = new Graphics()
      .roundRect(0, 0, width, height, 16)
      .fill(0x3498db);
    const text = new Text({
      text: "Spin",
      style: new TextStyle({
        fill: "#fff",
        fontSize: 28,
        fontWeight: "bold",
      }),
    });
    text.anchor.set(0.5);
    text.x = width / 2;
    text.y = height / 2;

    buttonView.addChild(this.buttonBg, text);

    this.addChild(buttonView);

    this.eventMode = "static";
    this.cursor = "pointer";
    this.onPress.connect(onClick);
  }

  public setEnabled(enabled: boolean) {
    this.eventMode = enabled ? "static" : "none";
    this.cursor = enabled ? "pointer" : "default";
    this.buttonBg.alpha = enabled ? 1 : 0.5;
  }
}
