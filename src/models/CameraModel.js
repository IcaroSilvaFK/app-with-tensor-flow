export default class CameraModel {
  video;
  #getCamera;
  #getSource;

  #fingerPose;
  #handPoseDetection;

  constructor(fingerPose, handPoseDetection, knowGestures) {}

  getCamera() {
    this.#getCamera = this.#_getCamera;

    return this;
  }

  stopCamera() {
    if (this.video) {
      this.video.getTracks().forEach((track) => track.stop());
    }

    return this;
  }

  getSource() {
    this.#getSource = this.#_getSource;
    return this;
  }

  async build() {
    if (this.#getCamera) {
      await this.#getCamera();
    }
    if (this.#getSource) {
      await this.#getSource(this.video);
    }

    return this.video;
  }

  async #_getSource() {
    // return this.video;
    return this;
  }

  async #_getCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    this.video = stream;
  }
}
