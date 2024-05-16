export const CooldownWarning = new PopupModal(
  type: "WARNING",
  title: "Woah there!",
  content: "Sorry, can’t save cards that quickly.",
);

export const RequestError = new PopupModal(
  type: "ERROR",
  title: "Something went wrong!",
  content: "An error occurred while sending a request to the server.",
);

export const ServerError = new PopupModal(
  type: "ERROR",
  title: "Something went wrong!",
  content: "An internal server error occurred.",
);
