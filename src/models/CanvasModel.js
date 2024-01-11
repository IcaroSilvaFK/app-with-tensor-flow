import fingerLookupIndexes from "../utils/fingerLookupIndexes.js";

export default class CanvasModel {
  #ctx;
  #canvas;
  constructor(canvas) {
    this.#ctx = canvas.getContext("2d");
    this.#canvas = canvas;

    this.#ctx.fillStyle = "white";
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  writeInCanvas(hands) {
    for (const { keypoints, handedness } of hands) {
      if (!keypoints) continue;

      this.#ctx.fillStyle = handedness === "Left" ? "green" : "red";
      this.#ctx.strokeStyle = "white";
      this.#ctx.lineWidth = 8;
      this.#ctx.lineJoin = "round";

      this.#drawJoients(keypoints);
    }
  }

  #drawJoients(keypoints) {
    for (const { x, y } of keypoints) {
      this.#ctx.beginPath();

      const newX = x - 2;
      const newY = y - 2;
      const radius = 4;
      const startAngle = 0;
      const endAngle = 2 * Math.PI;

      this.#ctx.arc(newX, newY, radius, startAngle, endAngle);
      this.#ctx.fill();

      this.#drawFingersAndHoverElement(keypoints);
    }
  }

  #drawFingersAndHoverElement(keypoints) {
    const fingers = Object.keys(fingerLookupIndexes);

    for (const finger of fingers) {
      const points = fingerLookupIndexes[finger].map((idx) => keypoints[idx]);

      const region = new Path2D();

      const [{ x, y }] = points;

      region.moveTo(x, y);

      for (const point of points) {
        region.lineTo(point.x, point.y);
      }

      this.#ctx.stroke(region);
    }
  }
}
