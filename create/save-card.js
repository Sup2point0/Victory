export default function saveCard(data) {
  return fetch(
    "https://sup2point0.npkn.net/victory-card-creator",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
  .catch(error => console.error(error));
}
