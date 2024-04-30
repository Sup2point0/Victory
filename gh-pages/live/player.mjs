class Player {
  static initHealth = 4000;
  static #shardCount = 0;

  shard;
  #health;

  get health() {
    return this.#health;
  }

  set health(value) {
    this.#health += value;
    if (this.#health < 0) {
      this.#health = 0;
    }

    document.querySelector(`.player${this.shard} .health-text`)
      .innerHTML = this.#health;
  }

  constructor(shard = null) {
    this.shard = shard ?? ++Player.#shardCount;
    this.reset();
  }

  reset() {
    this.health = 4000;
  }

  halveHealth() {
    this.health -= this.health / 2;
  }
}
