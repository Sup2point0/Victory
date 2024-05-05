// import { Player } from "player";
// import { processKeyboardShortcuts } from "shortcuts";

class Player {
  static initHealth = 4000;
  static #shardCount = 0;

  shard;
  element;

  #health;
  healthDisplayed;

  get health() {
    return this.#health;
  }

  set health(value) {
    this.#health = value;
    if (this.#health < 0) {
      this.#health = 0;
    }

    this.element.innerHTML = this.#health;
    this.element.style['--health-value'] = this.#health;
  }

  constructor(shard = null) {
    this.shard = shard ?? ++Player.#shardCount;
    this.element = document.querySelector(`.player-${this.shard} .health-text`);
    this.reset();
  }

  reset() {
    this.health = 4000;
  }

  halveHealth() {
    this.health -= this.health / 2;
  }
}

export function processKeyboardShortcuts(event) {
  if (!event.ctrlKey && !event.metaKey) {
    return;
  }

  switch (event.key) {
    case "1":
      event.preventDefault();
      document.querySelector(
        `.player-1 .health-input input`).focus();
      break;
    case "2":
      event.preventDefault();
      document.querySelector(
        `.player-2 .health-input input`).focus();
      break;
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
