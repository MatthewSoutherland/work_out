"use strict";

var isDragging = false;
var currentLineId = null;
var currentVertex = null;
var draggedVertex = null;
var selectedShapeId = null; // Keep track of the selected shape

function isCloseToVertex(mouseX, mouseY, vertexX, vertexY) {
  var distance = Math.sqrt(Math.pow(mouseX - vertexX, 2) + Math.pow(mouseY - vertexY, 2));
  return distance < .10; // Adjust this threshold as needed
} // Function to convert mouse coordinates to canvas coordinates


function getCanvasCoordinates(event) {
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left - canvasWidth / 2 - leftMargin; // Adjust for canvas offset and margin

  var mouseY = event.clientY - rect.top - canvasHeight / 2 - topMargin; // Adjust for canvas offset and margin
  // Invert the Y-axis transformation

  mouseY = -mouseY; // Adjust for the shift and scale transformations

  mouseX = (mouseX + shiftX) / scaleFactor / pixelsPerInch;
  mouseY = (mouseY + shiftY) / scaleFactor / pixelsPerInch;
  return {
    x: mouseX,
    y: mouseY
  };
}

function findClosestVertex(canvasX, canvasY) {
  var closeToVertex = false; // Flag to check if close to any vertex

  for (var id in shapes) {
    var shape = shapes[id];

    if (shape.type === 'line') {
      var xStart = shape.x1;
      var yStart = shape.y1;
      var xEnd = shape.x2;
      var yEnd = shape.y2; // Check proximity for both vertices

      if (isCloseToVertex(canvasX, canvasY, xStart, yStart) || isCloseToVertex(canvasX, canvasY, xEnd, yEnd)) {
        closeToVertex = true;
        canvas.style.cursor = 'pointer'; // Change cursor to pointer

        break; // Stop the loop if close to any vertex
      }
    } // Extend this for other shapes if necessary

  }

  if (!closeToVertex) {
    canvas.style.cursor = 'default'; // Change cursor back to default
  }
} // canvas.addEventListener('mousemove', function(event) {
//     let { x, y } = getCanvasCoordinates(event);
//     findClosestVertex(x, y);
// });


canvas.addEventListener('mousedown', function (event) {
  var _getCanvasCoordinates = getCanvasCoordinates(event),
      x = _getCanvasCoordinates.x,
      y = _getCanvasCoordinates.y;

  for (var id in shapes) {
    var shape = shapes[id];

    if (shape.type === 'line') {
      var xStart = shape.x1;
      var yStart = shape.y1;
      var xEnd = shape.x2;
      var yEnd = shape.y2;

      if (isCloseToVertex(x, y, xStart, yStart)) {
        isDragging = true;
        currentLineId = id;
        currentVertex = 'start';
        break;
      } else if (isCloseToVertex(x, y, xEnd, yEnd)) {
        isDragging = true;
        currentLineId = id;
        currentVertex = 'end';
        break;
      }
    }
  }
});
canvas.addEventListener('mousemove', function (event) {
  if (!isDragging) {
    var _getCanvasCoordinates2 = getCanvasCoordinates(event),
        _x = _getCanvasCoordinates2.x,
        _y = _getCanvasCoordinates2.y;

    findClosestVertex(_x, _y);
    return;
  }

  var _getCanvasCoordinates3 = getCanvasCoordinates(event),
      x = _getCanvasCoordinates3.x,
      y = _getCanvasCoordinates3.y;

  var shape = shapes[currentLineId];

  if (shape && currentVertex) {
    if (currentVertex === 'start') {
      shape.x1 = x.toString();
      shape.y1 = y.toString();
    } else {
      shape.x2 = x.toString();
      shape.y2 = y.toString();
    } // Redraw the canvas with the updated shapes


    redrawShapes();
  }
});
canvas.addEventListener('mouseup', function () {
  isDragging = false;
  currentLineId = null;
  currentVertex = null;
});
canvas.addEventListener('mouseup', function () {
  isDragging = false;
  currentLineId = null;
  currentVertex = null;
});