# SnakeReact 🐍

## Running

Do `npm install` then `npm run dev`.

## Debugging

Open VS Code, start the app with `npm run dev`, then press `F5` to start debugging.

## Adding a new game mode

- Open [game-modes.ts](src/modules/domain/game-modes.ts).
- Add the new game mode to all of the variables and config in the file.
- The game mode will now appear throughout the UI and can be played. High scores will also start being recorded automatically.
- To implement the game mode itself, add any custom logic to the domain classes (`src/modules/domain`) and the React components.

## Data

The app saves settings and high scores to Local Storage.
