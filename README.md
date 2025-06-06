# Slot Machine Game

## Project Overview

This project is a simple slot machine game implemented with **Pixi.js**.  
It was developed according to the following technical requirements:

### Features

- **5 reels and 3 rows** (5x3 grid) of symbols.
- **Spin button** to start the reels animation.
- **Spin counter**: displays the number of spins performed.
- **Animated spinning reels**: smooth animation for each spin.
- **Winning line detection**:
  - A win is registered when 3 or more identical symbols appear in a row (horizontally).
  - Winning symbols are highlighted with animation (scaling and color).
- **Win notification**: visual highlight for winning combinations.
- **Spin button lock**: the Spin button is disabled while the reels are spinning.
- **At least 5 different symbols**: each with unique color and label.
- **Random symbol generation** for each spin.
- **Bonus feature**:
  - Guaranteed at least one win after every 5th spin (if there was no win in the previous 4).
- **Code structure**:
  - Modular, object-oriented, and well-commented.
  - Error handling for main game actions.

### Technologies

- [Pixi.js](https://pixijs.com/) for rendering and animation.
- TypeScript for type safety and code clarity.

---

## How to Run Locally

1. **Clone the repository:**

   ```sh
   git clone https://github.com/PashaMylkus/slots.git
   cd slots
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm run dev
   ```

   or (depending on your setup)

   ```sh
   npm start
   ```

4. **Open the app:**
   - Go to [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal).

---

## Project Structure

- `src/core/Scenes/` — MainScene, InitialScene, and scene management.
- `src/core/Dispaly/Components/Reels/` — Reel, SlotCell, SlotReels, SpinButton, SpinCounter.
- `src/api/` — Fake backend logic for generating random spins and win lines.
- `src/config/` — Game configuration (reels, symbols, etc).

---

## Code Quality

- All main classes and methods are documented with JSDoc-style comments.
- The code is modular and follows OOP principles.
- Error handling is implemented for main game actions.
- Animations are smooth and visually clear.
- Bonus logic (guaranteed win after every 5th spin) is implemented.

---

## Requirements

- Node.js (v16+ recommended)
- npm

---

## License

MIT

---

**Enjoy spinning!**
