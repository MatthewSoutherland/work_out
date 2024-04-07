// GLOBAL VARIABLES
// canvas
const pixelsPerInch = 100;
const topMargin = 60;
const bottomMargin = 30;
const leftMargin = 20;
var scaleFactor;
let canvasWidth;
let canvasHeight;
var ctx;
let globalCanvasScale = 1.5;
let left_right_shift = 0;
let up_down_shift = 0;
var canvas;

// draw
let shapesCounter = 0;
let shapes = {};
var drawColor = "black";

// move
let isDragging = false;
let currentLineId = null;
let currentVertex = null;
let draggedVertex = null;
let selectedShapeId = null;

// validation
// Regex to match a floating-point number, includes + or - at beginning and a decimal
const numberRegex = /^[+-]?([0-9]*[.])?[0-9]+$/;

// valTest
currentUnitVisability = "drilling";

// modals
var drawLineModal;
var drawLineSpan;
var drawCircleModal;
var drawCircleSpan;
var drawRectModal;
var drawRectSpan;
var drawArcModal;
var drawArcSpan;
var showShapesModal;
var showShapesSpan;
var saveJsonModal;
var saveJsonSpan;
var loadJsonModal;
var loadJsonSpan;
var addTextModal;
var addTextSpan;
var activeModal;

document.addEventListener("DOMContentLoaded", event => {
  canvas = document.getElementById("canvas");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  drawCanvas([{ x: 0, y: 0 }]);

  canvas.addEventListener("mousedown", function (event) {
    let { x, y } = getCanvasCoordinates(event);

    for (let id in shapes) {
      const shape = shapes[id];
      if (shape.type === "line") {
        const xStart = shape.x1;
        const yStart = shape.y1;
        const xEnd = shape.x2;
        const yEnd = shape.y2;

        if (isCloseToVertex(x, y, xStart, yStart)) {
          isDragging = true;
          currentLineId = id;
          currentVertex = "start";
          break;
        } else if (isCloseToVertex(x, y, xEnd, yEnd)) {
          isDragging = true;
          currentLineId = id;
          currentVertex = "end";
          break;
        }
      }
    }
  });

  canvas.addEventListener("mousemove", function (event) {
    if (!isDragging) {
      let { x, y } = getCanvasCoordinates(event);
      findClosestVertex(x, y);
      return;
    }

    let { x, y } = getCanvasCoordinates(event);
    let shape = shapes[currentLineId];
    if (shape && currentVertex) {
      if (currentVertex === "start") {
        shape.x1 = x.toString();
        shape.y1 = y.toString();
      } else {
        shape.x2 = x.toString();
        shape.y2 = y.toString();
      }
      // Redraw the canvas with the updated shapes
      redrawShapes();
    }
  });

  canvas.addEventListener("mouseup", function () {
    isDragging = false;
    currentLineId = null;
    currentVertex = null;
  });

  canvas.addEventListener("mouseup", function () {
    isDragging = false;
    currentLineId = null;
    currentVertex = null;
  });

  drawLineModal = document.getElementById("draw-line-modal-content");
  drawCircleModal = document.getElementById("draw-circle-modal-content");
  drawRectModal = document.getElementById("draw-rectangle-modal-content");
  drawArcModal = document.getElementById("draw-arc-modal-content");
  showShapesModal = document.getElementById("show-shapes-modal-content");
  saveJsonModal = document.getElementById("save-json-modal-content");
  loadJsonModal = document.getElementById("load-json-modal-content");
  addTextModal = document.getElementById("add-text-modal-content");
   
});
