import { Player } from "player";
import { processKeyboardShortcuts } from "shortcuts";


var player1 = new Player();
var player2 = new Player();
// spare NULL for 1-indexing
var players = [null, player1, player2];


function updatePlayerHealth(shard) {
  players[shard].health += parseInt(
    document.querySelector(
      `.player${this.shard} .health-input input`
    ).value);
}

document.getElementById("reset")
  .addEventListener("click", event => {
    player1.reset();
    player2.reset();
  });

document.addEventListener("keydown", processKeyboardShortcuts);
