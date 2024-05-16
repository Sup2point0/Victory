import PopupModal from "./popup-modal.js";
import popups from "./popup-presets.js";


const SAVE_COOLDOWN = 10;

const URL = "https://sup2point0.npkn.net/victory-cards";


export default function saveCard(source) {
  let delta = Date.Now() - saveCards.lastSave;
  if (delta < SAVE_COOLDOWN) {
    return popups.Cooldown.show();
  }

  let field = ($id) => source.querySelector(`input#${$id}`).value;
  let fields = ($class) => source.querySelectorAll(`input.${$class}`)
    .map(elem => elem.value);

  let data = {
    id: field("id"),
    effects: (() => ())(),
  }

  let request = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }

  let response;
  try {
    response = fetch(URL, request)
  } catch (error) {
    return popups.RequestError.show()
  }

  switch (response.json().status_code) {
    case 501: return popups.ServerError.show();
  }
}

saveCard.lastSave = 0;

function findCardData() {}
function findSpiritData() {}
function findSpellData() {}
