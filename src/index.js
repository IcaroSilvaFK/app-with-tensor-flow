import CameraView from "./views/CameraView.js";
import CameraModel from "./models/CameraModel.js";
import HandPoseDetection from "./models/HandPoseDetection.js";
import knowGestures from "./gestures/index.js";
import CanvasModel from "./models/CanvasModel.js";
import CanvasView from "./views/CanvasView.js";

const handGestureDetectionModel = new HandPoseDetection(
  window.fp,
  window.handPoseDetection,
  window.VERSION,
  knowGestures
);

const cameraView = new CameraView(
  new CameraModel(),
  handGestureDetectionModel,
  new CanvasView()
);

cameraView.render();
