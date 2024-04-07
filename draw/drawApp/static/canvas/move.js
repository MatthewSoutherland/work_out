
  function isCloseToVertex(mouseX, mouseY, vertexX, vertexY) {
    const distance = Math.sqrt(Math.pow(mouseX - vertexX, 2) + Math.pow(mouseY - vertexY, 2));
    return distance < 0.1; // Adjust this threshold as needed
  }

  // Function to convert mouse coordinates to canvas coordinates
  function getCanvasCoordinates(event) {
    const rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left - canvasWidth / 2 - leftMargin; // Adjust for canvas offset and margin
    let mouseY = event.clientY - rect.top - canvasHeight / 2 - topMargin; // Adjust for canvas offset and margin

    // Invert the Y-axis transformation
    mouseY = -mouseY;

    // Adjust for the shift and scale transformations
    mouseX = (mouseX + shiftX) / scaleFactor / pixelsPerInch;
    mouseY = (mouseY + shiftY) / scaleFactor / pixelsPerInch;

    return { x: mouseX, y: mouseY };
  }

  function findClosestVertex(canvasX, canvasY) {
    let closeToVertex = false; // Flag to check if close to any vertex

    for (let id in shapes) {
      const shape = shapes[id];
      if (shape.type === "line") {
        const xStart = shape.x1;
        const yStart = shape.y1;
        const xEnd = shape.x2;
        const yEnd = shape.y2;

        // Check proximity for both vertices
        if (isCloseToVertex(canvasX, canvasY, xStart, yStart) || isCloseToVertex(canvasX, canvasY, xEnd, yEnd)) {
          closeToVertex = true;
          canvas.style.cursor = "pointer"; // Change cursor to pointer
          break; // Stop the loop if close to any vertex
        }
      }
      // Extend this for other shapes if necessary
    }

    if (!closeToVertex) {
      canvas.style.cursor = "default"; // Change cursor back to default
    }
  }
