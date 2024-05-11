import { Player } from "./player.js";
import { ActionHistory, InvertibleAction } from "./action-history.js";


var player1 = new Player();
var player2 = new Player();

var deltaPolarity = -1;
var actionHistory = new ActionHistory();


function updatePlayerHealth(shard) {
  let delta = deltaPolarity * parseInt(
    document.querySelector(`.player-${shard} .health-input input`).value);

  Player.activePlayers[shard].health += delta;
  actionHistory.push(new InvertibleAction(
    value => Player.activePlayers[shard].health += value, delta
   ));
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

document.getElementById("action-undo")
  .addEventListener("click", event => actionHistory.tryUndo());

document.getElementById("shortcuts-help")
  .addEventListener("click", event =>
    document.querySelector(".overlay")
      .style.display = "block"
  );


// KEYBOARD SHORTCUTS //
document.addEventListener("keydown", processKeyboardShortcuts);

const keyboardShortcuts = {
  "1": () => document.querySelector(`.player-1 .health-input input`).focus(),
  "2": () => document.querySelector(`.player-2 .health-input input`).focus(),
  "q": () => swapPolarity.click(),
  "r": () => actionReset.click(),
  "z": () => actionHistory.tryUndo(),
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
