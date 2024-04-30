export function processKeyboardShortcuts(event) {
  if (!event.ctrlKey && !event.metaKey) {
    return;
  }

  event.preventDefault();

  switch (event.key) {
    case "1":
      document.querySelector(
        `.player${this.shard} .health-input input`).focus();
    default: return;
  }
}
