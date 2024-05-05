export function processKeyboardShortcuts(event) {
  if (!event.ctrlKey && !event.metaKey) {
    return;
  }

  switch (event.key) {
    case "1":
      event.preventDefault();
      document.querySelector(
        `.player-${this.shard} .health-input input`).focus();
      break;
    default: return;
  }
}
