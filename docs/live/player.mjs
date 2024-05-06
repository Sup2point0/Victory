class Player {
  static initHealth = 4000;
  static #shardCount = 0;

  shard;
  element;

  #health;
  healthDisplayed;

  get health() {
    return this.#health;
  }

  set health(value) {
    this.#health = value;
    if (this.#health < 0) {
      this.#health = 0;
    }

    this.element.innerHTML = this.#health;
    this.element.style['--health-value'] = this.#health;
  }

  constructor(shard = null) {
    this.shard = shard ?? ++Player.#shardCount;
    this.element = document.querySelector(`.player-${this.shard} .health-text`);
    this.reset();
  }

  reset() {
    this.health = 4000;
  }

  halveHealth() {
    this.health -= this.health / 2;
  }
}