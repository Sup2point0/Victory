// import { Player } from "player";
// import { processKeyboardShortcuts } from "shortcuts";

class Player {
  static initHealth = 4000;
  static #shardCount = 0;

  shard;
  #health;

  get health() {
    return this.#health;
  }

  set health(value) {
    this.#health = value;
    if (this.#health < 0) {
      this.#health = 0;
    }

    document.querySelector(`.player-${this.shard} .health-text`)
      .innerHTML = this.#health;
  }

  constructor(shard = null) {
    this.shard = shard ?? ++Player.#shardCount;
    this.reset();
  }

  reset() {
    this.#health = 4000;
  }

  halveHealth() {
    this.health -= this.health / 2;
  }
}

function processKeyboardShortcuts(event) {
  if (!event.ctrlKey && !event.metaKey) {
    return;
  }

  event.preventDefault();

  switch (event.key) {
    case "1":
      document.querySelector(
        `.player-${this.shard} .health-input input`).focus();
    default: return;
  }
}


var player1 = new Player();
var player2 = new Player();
// spare NULL for 1-indexing
var players = [null, player1, player2];


function updatePlayerHealth(shard) {
  players[shard].health += parseInt(
    document.querySelector(
      `.player-${shard} .health-input input`
    ).value);
}

document.querySelector(".player-1 .health-input button")
  .addEventListener("click", event => updatePlayerHealth(1));
document.querySelector(".player-2 .health-input button")
  .addEventListener("click", event => updatePlayerHealth(2));

document.getElementById("action-reset")
  .addEventListener("click", event => {
    player1.reset();
    player2.reset();
  });

document.addEventListener("keydown", processKeyboardShortcuts);
