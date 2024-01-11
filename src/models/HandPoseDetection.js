export default class HandPoseDetection {
  #gestureEstimator;
  #handPoseDetection;
  #detector;
  #handsVersion;

  constructor(fingerpose, handPoseDetection, handsVersion, knownGestures) {
    this.#gestureEstimator = new fingerpose.GestureEstimator(knownGestures);
    this.#handPoseDetection = handPoseDetection;
    this.#handsVersion = handsVersion;
  }

  async estimateHands(video) {
    return this.#detector.estimateHands(video, {
      flipHorizontal: true,
    });
  }

  async estimate(keypoints3d) {
    const predictions = await this.#gestureEstimator.estimate(
      this.#getLandMarksFromKeyPoints(keypoints3d),
      // porcentagem de confiança do gesto 90%
      9
    );
    return predictions.gestures;
  }

  #getLandMarksFromKeyPoints(keypoints3D) {
    return keypoints3D.map((point) => [point.x, point.y, point.z]);
  }

  async *detectGestures(predictions) {
    for (const hand of predictions) {
      if (!hand.keypoints3D) continue;

      const gestures = await this.estimate(hand.keypoints3D);

      if (!gestures.length) continue;

      const result = gestures.reduce((acc, current) =>
        acc.score > current.score ? acc : current
      );

      const { x, y } = hand.keypoints.find(
        (k) => k.name === "index_finger_tip"
      );

      yield {
        event: result.name,
        x,
        y,
      };
    }
  }

  async initializeDetector() {
    if (this.#detector) return this.#detector;

    const model = this.#handPoseDetection.SupportedModels.MediaPipeHands;

    const detectorConfig = {
      runtime: "mediapipe",
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handsVersion}`,
      modelType: "lite",
      maxHands: 2,
    };

    this.#detector = await this.#handPoseDetection.createDetector(
      model,
      detectorConfig
    );

    return this.#detector;
  }
}
