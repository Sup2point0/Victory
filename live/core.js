import { Player } from "./player.js";
import { ActionHistory, InvertibleAction } from "./action-history.js";


var player1 = new Player();
var player2 = new Player();

var currentTurn = 1;
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
const swapPolarity = document.getElementById("swap-polarity");
const swapPolarityChild = swapPolarity.children[0]
swapPolarity.addEventListener("click", event => {
  deltaPolarity *= -1;
  swapPolarityChild.innerHTML = deltaPolarity > 0 ? "add" : "remove";
  swapPolarity.className = "polarity-" + (deltaPolarity > 0 ? "positive" : "negative");
});

const actionReset = document.getElementById("action-reset");
actionReset.addEventListener("click", event => Player.resetAll());

const displayContainer = document.querySelector(".health-display");
document.getElementById("action-swap")
  .addEventListener("click", event => 
    displayContainer.style.flexDirection =
      displayContainer.style.flexDirection === "row-reverse" ? "row" : "row-reverse"
  );

document.getElementById("action-undo")
  .addEventListener("click", event => actionHistory.tryUndo());

const noteRows = document.querySelector(".notes");
const noteNode = document.querySelector(".notes template");
const addNote = document.getElementById("add-note");
addNote.addEventListener("click", event =>
  noteRows.appendChild(noteNode.content.cloneNode(true))
);

document.getElementById("shortcuts-help")
  .addEventListener("click", event =>
    document.querySelector(".overlay")
      .style.display = "block"
  );


// ELEMENTS
const playlist = document.querySelector("youtube-playlist iframe");
playlist.src = "https://www.youtube.com/embed/videoseries?list=PL00nN9ot3iD8DbeEIvGNml5A9aAOkXaIt&index="
  + Math.floor(Math.random() * 94);
playlist.requestPictureInPicture();


// KEYBOARD SHORTCUTS //
document.addEventListener("keydown", processKeyboardShortcuts);

const keyboardShortcuts = {
  "1": () => document.querySelector(`.player-1 .health-input input`).focus(),
  "2": () => document.querySelector(`.player-2 .health-input input`).focus(),
  "q": () => swapPolarity.click(),
  "r": () => actionReset.click(),
  "z": () => actionHistory.tryUndo(),
  "t": () => {
    currentTurn = (currentTurn++ % 2);
    document.querySelector(".content").className = `content turn-${currentTurn}`;
  },
  "s": () => addNote.click(),
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
