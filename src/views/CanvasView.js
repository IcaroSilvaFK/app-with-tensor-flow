import BaseView from "./base/BaseView.js";
import CanvasModel from "../models/CanvasModel.js";

export default class CanvasView extends BaseView {
  canvas = this.createElement("canvas");

  #model;

  constructor() {
    super();
    this.#model = new CanvasModel(this.canvas);
  }

  render(hands) {
    this.#model.writeInCanvas(hands);

    this.app.appendChild(this.canvas);
  }
}
