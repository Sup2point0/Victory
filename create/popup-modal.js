export default class PopupModal {
  constructor({type, title, content, buttons = null} = {}) {
    this.html = `<div class="popup ${type.toLowerCase()} active">
  <div class="popup-box">
    <h2> ${title} </h2>
    <p> ${content} </p>
  </div>
</div>`;

    this.root = document.querySelector("html .popups");
  }

  show() {
    this.root.innerHTML = this.html;
  }

  hide() {
    this.root.child.classes = "close";
  }
}
