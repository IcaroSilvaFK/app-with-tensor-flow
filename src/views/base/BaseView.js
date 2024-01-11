export default class BaseView {
  app = document.querySelector("#app");
  $;
  constructor() {
    this.$ = document.querySelector.bind(document);
  }

  createElement(element) {
    return document.createElement(element);
  }

  render() {
    throw new Error("Not implemented");
  }
}
