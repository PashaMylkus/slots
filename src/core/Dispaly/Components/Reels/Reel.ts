import { Container, Graphics, Ticker } from "pixi.js";
import { SlotCell } from "./SlotCell";
import { GAP, ROWS, SYMBOL_HEIGHT } from "@/config/reels-config";
import { SlotSymbol } from "./SlotReels";

const VISIBLE_HEIGHT = ROWS * (SYMBOL_HEIGHT + GAP) - GAP;
const SPIN_EXTRA = 4;
/**
 * Reel — visual component representing a single slot reel.
 *
 * Responsibilities:
 * - Manages a vertical list of SlotCell instances (symbols) for one reel.
 * - Handles spinning animation and updates visible symbols.
 * - Provides methods to highlight and clear winning cells.
 *
 * Key methods:
 * - constructor: initializes the reel with SlotCell instances and sets up masking.
 * - spin: animates the reel and updates symbols according to the target matrix.
 * - getVisibleCell: returns the visible SlotCell for a given row index.
 * - highlightCells: highlights specific visible cells by row.
 * - clearHighlights: removes highlights from all cells in the reel.
 */
export class Reel extends Container {
  public cells: SlotCell[] = [];
  private spinning = false;
  private targetSymbols: SlotSymbol[] = [];
  private ticker?: Ticker;
  private lastVisibleSymbols: SlotSymbol[] = [];

  constructor(symbols: SlotSymbol[], width: number, _height: number) {
    super();

    const mask = new Graphics()
      .rect(0, 0, width, VISIBLE_HEIGHT)
      .fill({ color: 0xffffff });
    this.mask = mask;
    this.addChild(mask);

    for (let i = 0; i < ROWS + SPIN_EXTRA; i++) {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const cell = new SlotCell(
        symbol.color,
        symbol.label,
        width,
        SYMBOL_HEIGHT
      );
      cell.x = width / 2;
      cell.y = i * (SYMBOL_HEIGHT + GAP) + SYMBOL_HEIGHT / 2;
      this.cells.push(cell);
      this.addChild(cell);
    }
  }

  public spin(
    targetIds: number[],
    symbolsMap: Map<number, SlotSymbol>,
    onStop?: () => void
  ) {
    if (this.spinning) return;
    this.spinning = true;
    this.targetSymbols = targetIds.map((id) => symbolsMap.get(id)!);

    if (this.lastVisibleSymbols.length !== ROWS) {
      this.lastVisibleSymbols = [];
      for (let i = 0; i < ROWS; i++) {
        const randomSymbol = Array.from(symbolsMap.values())[
          Math.floor(Math.random() * symbolsMap.size)
        ];
        this.lastVisibleSymbols.push(randomSymbol);
      }
    }

    for (let i = 0; i < ROWS; i++) {
      const symbol = this.lastVisibleSymbols[i];
      this.cells[i].setSymbol(symbol.color, symbol.label);
      this.cells[i].y = i * (SYMBOL_HEIGHT + GAP) + SYMBOL_HEIGHT / 2;
    }
    for (let i = ROWS; i < this.cells.length; i++) {
      const randomSymbol = Array.from(symbolsMap.values())[
        Math.floor(Math.random() * symbolsMap.size)
      ];
      this.cells[i].setSymbol(randomSymbol.color, randomSymbol.label);
      this.cells[i].y = i * (SYMBOL_HEIGHT + GAP) + SYMBOL_HEIGHT / 2;
    }

    let speed = 40;
    let distance = 0;
    const totalDistance = (ROWS + SPIN_EXTRA) * (SYMBOL_HEIGHT + GAP) * 2;

    this.ticker = new Ticker();
    this.ticker.add(() => {
      for (const cell of this.cells) {
        cell.y += speed;
      }
      distance += speed;

      for (const cell of this.cells) {
        if (
          cell.y >=
          (ROWS + SPIN_EXTRA) * (SYMBOL_HEIGHT + GAP) + SYMBOL_HEIGHT / 2
        ) {
          cell.y -= (ROWS + SPIN_EXTRA) * (SYMBOL_HEIGHT + GAP);
          const randomSymbol = Array.from(symbolsMap.values())[
            Math.floor(Math.random() * symbolsMap.size)
          ];
          cell.setSymbol(randomSymbol.color, randomSymbol.label);
        }
      }

      if (distance >= totalDistance) {
        this.ticker?.stop();
        this.ticker?.destroy();
        this.ticker = undefined;
        this.spinning = false;

        for (let i = 0; i < ROWS; i++) {
          const cell = this.cells[i];
          const symbol = this.targetSymbols[i];
          cell.setSymbol(symbol.color, symbol.label);
          cell.y = i * (SYMBOL_HEIGHT + GAP) + SYMBOL_HEIGHT / 2;
        }
        this.lastVisibleSymbols = [...this.targetSymbols];

        for (let i = ROWS; i < this.cells.length; i++) {
          this.cells[i].y = -9999;
        }

        if (onStop) onStop();
      }
    });
    this.ticker.start();
  }

  public getVisibleCell(row: number): SlotCell {
    const yTarget =
      row * (this.cells[0].height + GAP) + this.cells[0].height / 2;
    return this.cells.find(
      (cell) => Math.abs(cell.y - yTarget) < 1
    ) as SlotCell;
  }

  public highlightCells(rows: number[]) {
    for (let i = 0; i < rows.length; i++) {
      const cell = this.getVisibleCell(rows[i]);
      if (cell) {
        cell.highlightBorder();
      }
    }
  }

  public clearHighlights() {
    for (const cell of this.cells) {
      cell.clearHighlight();
    }
  }
}
