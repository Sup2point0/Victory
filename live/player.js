export class Player {
  // STATIC //
  static healthInit = 4000;
  static healthDecayRate = 8;
  static healthDecayThreshold = 10;

  // DYNAMIC //
  static #shardCount = 0;
  static activePlayers = [null]; // spare NULL for 1-indexing
  static apexHealth = this.healthInit;

  // FIELDS //
  shard;
  element;
  meter;

  #health;
  healthText;

  // CONSTRUCTOR //
  constructor(shard = null) {
    this.shard = shard ?? ++Player.#shardCount;
    this.element = document.querySelector(`.player-${this.shard} .health-text`);
    this.meter = document.querySelector(`.player-${this.shard} meter`);
    this.reset();
    Player.activePlayers.push(this);
  }

  // PROPERTIES //
  get health() {
    return this.#health;
  }

  set health(value) {
    this.#health = value;
    if (this.#health < 0) {
      this.#health = 0;
    }

    requestAnimationFrame(this._callSlideHealth(this.#health));
  }

  // METHODS //
  reset() {
    this.health = Player.healthInit;
    this.healthText = Player.healthInit;
    this.meter.max = Player.healthInit;
  }

  halveHealth() {
    this.health -= this.health / 2;
  }

  static resetAll() {
    Player.activePlayers.slice(1).forEach(player => player.reset());
  }

  // INTERNAL //
  _slideApexHealth(target) {
    Player.apexHealth = Math.max(
      Player.activePlayers[1],
      Player.activePlayers[2]
    );
    if (target !== Player.apexHealth) return;

    let delta = Player.apexHealth - this.meter.max;
    let final = (Math.abs(delta) < Player.healthDecayThreshold);

    if (final) {
      this.meter.max = Player.apexHealth;
    } else {
      this.meter.max += delta / Player.healthDecayRate;
    }
  }

  _slideHealth(targetHealth, targetApexHealth) {
    this._slideApexHealth(targetApexHealth);

    if (targetHealth !== this.#health) return;
  
    let delta = this.#health - this.healthText;
    let final = (Math.abs(delta) < Player.healthDecayThreshold);

    if (final) {
      this.healthText = this.#health;
    } else {
      this.healthText += delta / Player.healthDecayRate;
    }

    this.element.innerHTML = Math.round(this.healthText);
    this.meter.value = Math.round(this.healthText);

    if (!final) {
      requestAnimationFrame(this._callSlideHealth(targetHealth, targetApexHealth));
    }
  }
  
  _callSlideHealth(targetHealth, targetApexHealth) {
    return (timestamp) => this._slideHealth(targetHealth, targetApexHealth);
  }
}
