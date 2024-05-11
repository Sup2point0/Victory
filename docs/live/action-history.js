/*
Handles tracing actions for undo/redo.
*/

export class InvertibleAction {
  action;
  inverse;

  constructor(action, arg, inverse = null) {
    this.action = () => action(arg);
    this.inverse = inverse ?? (() => action(-arg));
  }
}


export class ActionHistory {
  #actions = [];
  cursor = 0;  // Use 1-indexing for convenience and convert when needed

  push(action) {
    if (this.cursor < this.#actions.length) {
      this.#actions = this.#actions.slice(0, this.cursor);
    }

    this.#actions.push(action);
    this.cursor = this.#actions.length;
  }

  tryUndo() {
    if (this.cursor > 0) {
      this.#actions[--this.cursor].inverse();
      return true;
    } else {
      return false;
    }
  }

  tryRedo() {
    if (this.cursor < this.#actions.length) {
      this.#actions[++this.cursor].action();
      return true;
    } else {
      return false;
    }
  }
}
