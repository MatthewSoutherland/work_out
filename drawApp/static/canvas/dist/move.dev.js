"use strict";

function isCloseToVertex(mouseX, mouseY, vertexX, vertexY) {
  var distance = Math.sqrt(Math.pow(mouseX - vertexX, 2) + Math.pow(mouseY - vertexY, 2));
  return distance < 0.1; // Adjust this threshold as needed
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

    if (shape.type === "line") {
      var xStart = shape.x1;
      var yStart = shape.y1;
      var xEnd = shape.x2;
      var yEnd = shape.y2; // Check proximity for both vertices

      if (isCloseToVertex(canvasX, canvasY, xStart, yStart) || isCloseToVertex(canvasX, canvasY, xEnd, yEnd)) {
        closeToVertex = true;
        canvas.style.cursor = "pointer"; // Change cursor to pointer

        break; // Stop the loop if close to any vertex
      }
    } // Extend this for other shapes if necessary

  }

  if (!closeToVertex) {
    canvas.style.cursor = "default"; // Change cursor back to default
  }
}