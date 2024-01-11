import BaseView from "./base/BaseView.js";
import gesturesObj from "../utils/gestures.js";

export default class CameraView extends BaseView {
  #model;
  /**
   * @type HTMLVideoElement
   */
  video = this.createElement("video");

  #canvas;

  #handPoseDetection;

  constructor(model, handPoseDetection, canvas) {
    super();
    this.#model = model;
    this.#handPoseDetection = handPoseDetection;
    this.#canvas = canvas;
  }

  async #loop(fn) {
    await this.#handPoseDetection.initializeDetector();
    const hand = await this.#handPoseDetection.estimateHands(this.video);

    if (hand?.length) {
      this.#canvas.render(hand);
    }

    for await (const { event, x, y } of this.#handPoseDetection.detectGestures(
      hand
    )) {
      if (gesturesObj[event]) {
        const element = document.createElement("span");
        element.textContent = gesturesObj[event];
        this.app.appendChild(element);

        setTimeout(() => {
          this.app.removeChild(element);
        }, 100);
      }
    }

    requestAnimationFrame(fn);
  }

  loop() {
    this.#loop(this.loop.bind(this));
  }

  async render() {
    const result = await this.#model.getCamera().getSource().build(this.video);

    this.video.classList.add("user__device__video");
    this.video.autoplay = true;

    this.video.srcObject = result;

    this.loop();

    this.app.appendChild(this.video);
  }
}
