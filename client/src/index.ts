import { Game } from "./game/Game";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

  const game = new Game(canvas);
  game.init();
  game.run();
});
