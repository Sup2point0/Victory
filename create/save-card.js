import * as popups from "./popup-presets.js";


const SAVE_COOLDOWN = 10;

const URL = "https://sup2point0.npkn.net/victory-cards";


export default async function saveCard(source) {
  let delta = Date.now() - saveCard.lastSave;
  if (delta < SAVE_COOLDOWN) {
    return popups.Cooldown.show();
  }

  let field = ($id) => source.querySelector(`input#${$id}`).value;
  let fields = ($class) => source.querySelectorAll(`input.${$class}`)
    .map(elem => elem.value);

  let data = {
    Shard: field("card-id"),
    // effects: (() => ())(),
  }

  let request = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }

  let response;
  // try {
    response = await fetch(URL, request)
    response = await response.json();
  // } catch (error) {
  //   return popups.RequestError.show()
  // }

  switch (response.status_code) {
    case 500: return popups.ServerError.show();
  }
}

saveCard.lastSave = 0;

function findCardData() {}
function findSpiritData() {}
function findSpellData() {}
