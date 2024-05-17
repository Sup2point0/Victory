import saveCard from "./save-card.js";


document.getElementById("create-card")
  .addEventListener("click", event => saveCard(document));
