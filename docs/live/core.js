// import { Player } from "player";
import { ActionHistory, InvertibleAction } from "./action-history.js";

class Player {
  // STATIC //
  static healthInit = 4000;
  static healthDecayRate = 8;
  static healthDecayThreshold = 10;

  // DYNAMIC //
  static #shardCount = 0;
  static activePlayers = [null]; // spare NULL for 1-indexing
  static apexHealth = this.healthInit;

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

    requestAnimationFrame(this._callSlideHealth(this.#health));
  }

  // METHODS //
  reset() {
    this.health = Player.healthInit;
    this.healthText = Player.healthInit;
    this.meter.max = Player.healthInit;
  }

  halveHealth() {
    this.health -= this.health / 2;
  }

  static resetAll() {
    Player.activePlayers.slice(1).forEach(player => player.reset());
  }

  // INTERNAL //
  _slideApexHealth(target) {
    Player.apexHealth = Math.max(
      Player.activePlayers[1],
      Player.activePlayers[2]
    );
    if (target !== Player.apexHealth) return;

    let delta = Player.apexHealth - this.meter.max;
    let final = (Math.abs(delta) < Player.healthDecayThreshold);

    if (final) {
      this.meter.max = Player.apexHealth;
    } else {
      this.meter.max += delta / Player.healthDecayRate;
    }
  }

  _slideHealth(targetHealth, targetApexHealth) {
    this._slideApexHealth(targetApexHealth);

    if (targetHealth !== this.#health) return;
  
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
      requestAnimationFrame(this._callSlideHealth(targetHealth, targetApexHealth));
    }
  }
  
  _callSlideHealth(targetHealth, targetApexHealth) {
    return (timestamp) => this._slideHealth(targetHealth, targetApexHealth);
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

let actionReset = document.getElementById("action-reset");
actionReset.addEventListener("click", event => Player.resetAll());

let displayContainer = document.querySelector(".health-display");
document.getElementById("action-swap")
  .addEventListener("click", event => 
    displayContainer.style.flexDirection =
      displayContainer.style.flexDirection === "row-reverse" ? "row" : "row-reverse"
  );

// GLOBAL //
document.addEventListener("keydown", processKeyboardShortcuts);


// KEYBOARD SHORTCUTS //
const keyboardShortcuts = {
  "1": () => document.querySelector(`.player-1 .health-input input`).focus(),
  "2": () => document.querySelector(`.player-2 .health-input input`).focus(),
  "q": () => swapPolarity.click(),
  "r": () => actionReset.click(),
}

function processKeyboardShortcuts(event) {
  if (!event.ctrlKey && !event.metaKey) {
    return;
  }

  if (event.key in keyboardShortcuts) {
    event.preventDefault();
    keyboardShortcuts[event.key]();
  }
}
