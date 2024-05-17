import saveCard from "./save-card.js";


document.getElementById("create-card")
  .addEventListener("click", async event => await saveCard(document));
