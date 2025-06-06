import { REELS, ROWS, SYMBOLS_COUNT } from "@/config/reels-config";

type Matrix = number[][];
type WinLine = { positions: [number, number][]; symbolId: number };

export const generateSpinResult = (() => {
  let spinCounter = 0;

  return function (): { matrix: Matrix; winLines?: WinLine[] } {
    spinCounter++;

    // 1. Генеруємо випадкову матрицю
    const matrix: Matrix = [];
    for (let col = 0; col < REELS; col++) {
      const reel: number[] = [];
      for (let row = 0; row < ROWS; row++) {
        reel.push(Math.floor(Math.random() * SYMBOLS_COUNT));
      }
      matrix.push(reel);
    }

    // 2. Шукаємо виграшні лінії (3+ однакових поспіль у рядку)
    const winLines: WinLine[] = [];
    for (let row = 0; row < ROWS; row++) {
      let count = 1;
      let startCol = 0;
      for (let col = 1; col < REELS; col++) {
        if (matrix[col][row] === matrix[col - 1][row]) {
          count++;
          if (col === REELS - 1 && count >= 3) {
            winLines.push({
              symbolId: matrix[col][row],
              positions: Array.from(
                { length: count },
                (_, i) => [col - count + 1 + i, row] as [number, number]
              ),
            });
          }
        } else {
          if (count >= 3) {
            winLines.push({
              symbolId: matrix[col - 1][row],
              positions: Array.from(
                { length: count },
                (_, i) => [startCol + i, row] as [number, number]
              ),
            });
          }
          count = 1;
          startCol = col;
        }
      }
    }

    // 3. Якщо це кожен 5-й спін і виграшу немає — примусово створюємо виграш
    if (spinCounter % 5 === 0 && winLines.length === 0) {
      // Наприклад, робимо виграш у першому рядку, символ 0
      for (let col = 0; col < 3; col++) {
        matrix[col][0] = 0;
      }
      winLines.push({
        symbolId: 0,
        positions: [
          [0, 0],
          [1, 0],
          [2, 0],
        ],
      });
    }

    if (winLines.length > 0) {
      return { matrix, winLines };
    }
    return { matrix };
  };
})();
