import { Container } from "pixi.js";
import { Reel } from "./Reel";
import { GAP, REELS, SYMBOL_HEIGHT, SYMBOL_WIDTH } from "@/config/reels-config";

export type SlotSymbol = {
  id: number;
  color: number;
  label: string;
};

const SYMBOLS: SlotSymbol[] = [
  { id: 0, color: 0xe74c3c, label: "A" },
  { id: 1, color: 0x27ae60, label: "B" },
  { id: 2, color: 0xf1c40f, label: "C" },
  { id: 3, color: 0x2980b9, label: "D" },
  { id: 4, color: 0x9b59b6, label: "E" },
];

export const SYMBOLS_MAP = new Map<number, SlotSymbol>(
  SYMBOLS.map((s) => [s.id, s])
);
/**
 * SlotReels — component that manages all slot reels in the slot machine.
 *
 * Responsibilities:
 * - Creates and positions all Reel instances.
 * - Handles spinning of all reels with a given matrix of symbol IDs.
 * - Provides methods to highlight and clear winning lines on the reels.
 *
 * Key methods:
 * - constructor: initializes and positions all reels.
 * - spin: starts spinning all reels with the provided matrix and calls a callback when all reels stop.
 * - highlightWinLines: highlights all cells that are part of winning lines.
 * - clearHighlights: removes all highlights from all reels.
 */
export class SlotReels extends Container {
  private reels: Reel[] = [];

  constructor() {
    super();

    for (let i = 0; i < REELS; i++) {
      const reel = new Reel(SYMBOLS, SYMBOL_WIDTH, SYMBOL_HEIGHT);
      reel.x = i * (SYMBOL_WIDTH + GAP);
      this.addChild(reel);
      this.reels.push(reel);
    }
    this.x = (window.innerWidth - this.width) / 2;
    this.y = (window.innerHeight - this.height) / 2;
  }

  public spin(matrix: number[][], onAllStop?: () => void) {
    let stopped = 0;
    for (let i = 0; i < REELS; i++) {
      this.reels[i].spin(matrix[i], SYMBOLS_MAP, () => {
        stopped++;
        if (stopped === REELS && onAllStop) onAllStop?.();
      });
    }
  }

  public highlightWinLines(winLines: { positions: [number, number][] }[]) {
    this.clearHighlights();
    for (const line of winLines) {
      for (const [col, row] of line.positions) {
        const cell = this.reels[col].getVisibleCell(row);

        if (cell) cell.highlightBorder();
      }
    }
  }

  public clearHighlights() {
    for (const reel of this.reels) {
      reel.clearHighlights();
    }
  }
}
