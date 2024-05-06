// import { Player } from "player"; //
// import { processKeyboardShortcuts } from "shortcuts"; //

class Player {
  // STATIC //
  static healthInit = 4000;
  static healthDecayRate = 8;
  static healthDecayThreshold = 10;

  // DYNAMIC //
  static #shardCount = 0;
  static activePlayers = [null]; // spare NULL for 1-indexing
  static healthExceeded = false;

  // FIELDS //
  shard;
  element;
  meter;

  #health;
  healthText;

  // CONSTRUCTOR //
  constructor(shard = null) {
    this.shard = shard ?? ++Player.#shardCount;
    this.element = document.querySelector(`.player-${this.shard} .health-text`);
    this.meter = document.querySelector(`.player-${this.shard} meter`);
    this.reset();
    Player.activePlayers.push(this);
  }

  // PROPERTIES //
  get health() {
    return this.#health;
  }

  set health(value) {
    this.#health = value;
    if (this.#health < 0) {
      this.#health = 0;
    }

    if (this.#health > Player.healthInit) {
      Player.healthExceeded = true;
    }

    if (Player.healthExceeded) {
      Player.healthExceeded = false;
   
      Player.activePlayers.slice(1).forEach(player => {
        player.meter.max = Math.max(
          Player.activePlayers[1].health,
          Player.activePlayers[2].health
        );
      });
    }

    requestAnimationFrame(this._callSlideHealth(this.#health));
  }

  // METHODS //
  reset() {
    this.healthText = Player.healthInit;
    this.health = Player.healthInit;
    this.meter.max = Player.healthInit;
  }

  halveHealth() {
    this.health -= this.health / 2;
  }

  static resetAll() {
    Player.activePlayers.slice(1).forEach(player => player.reset());
  }

  // INTERNAL //
  _slideHealth(target) {
    if (target !== this.#health) return;
  
    let delta = this.#health - this.healthText;
    let final = (Math.abs(delta) < Player.healthDecayThreshold);
    if (final) {
      this.healthText = this.#health;
    } else {
      this.healthText += delta / Player.healthDecayRate;
    }

    this.element.innerHTML = Math.round(this.healthText);
    this.meter.value = Math.round(this.healthText);

    if (!final) {
      requestAnimationFrame(this._callSlideHealth(target));
    }
  }
  
  _callSlideHealth(target) {
    return (timestamp) => this._slideHealth(target);
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
    case "q":
      event.preventDefault();
      swapPolarity.click();
      break;
    default: return;
  }
}


var player1 = new Player();
var player2 = new Player();

var deltaPolarity = 1;
var actionStack = [];


function updatePlayerHealth(shard) {
  let delta = deltaPolarity * parseInt(
    document.querySelector(`.player-${shard} .health-input input`).value);

  Player.activePlayers[shard].health += delta;
  actionStack.push({shard: shard, delta: delta,})
}


// INPUTS //
document.querySelector(".player-1 .health-input input")
  .addEventListener("keydown", event => {
    if (event.key == "Enter") updatePlayerHealth(1)}
  );
document.querySelector(".player-2 .health-input input")
  .addEventListener("keydown", event => {
    if (event.key == "Enter") updatePlayerHealth(2)}
  );

// BUTTONS //
let swapPolarity = document.getElementById("swap-polarity");
let swapPolarityChild = swapPolarity.children[0]

swapPolarity.addEventListener("click", event => {
  deltaPolarity *= -1;
  swapPolarityChild.innerHTML = deltaPolarity > 0 ? "add" : "remove";
  swapPolarity.className = "polarity-" + (deltaPolarity > 0 ? "positive" : "negative");
});

document.getElementById("action-reset")
  .addEventListener("click", event => Player.resetAll());

let displayContainer = document.querySelector(".health-display");
document.getElementById("action-swap")
  .addEventListener("click", event => 
    displayContainer.style.flexDirection =
      displayContainer.style.flexDirection === "row-reverse" ? "row" : "row-reverse"
  );

// GLOBAL //
document.addEventListener("keydown", processKeyboardShortcuts);
