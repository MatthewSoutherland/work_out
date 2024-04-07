
  function getDrawingDetails(type) {
    const color = getElementValue(`${type}-draw-color`);
    const solidLine = document.getElementById(`${type}-solid-line`).checked;
    const lineWidth = getElementValue(`${type}-line-width`);

    return [color, solidLine, lineWidth];
  }

  function updateShapesCounter() {
    shapesCounter = Object.keys(shapes).length;
  }

  function drawLine() {
    const drawLineModal = document.getElementById("draw-line-modal");
    const x1 = getElementValue("x1");
    const y1 = getElementValue("y1");
    const x2 = getElementValue("x2");
    const y2 = getElementValue("y2");
    
    let [color, solidLine, lineWidth] = getDrawingDetails('line');

    canvasMain.drawLine(x1, x2, y1, y2, color, solidLine, lineWidth);

    drawLineModal.style.display = "none";
  }

  function drawRectangle() {
    const drawRectModal = document.getElementById("draw-rectangle-modal");
    let rx = getElementValue("rect-x");
    let ry = getElementValue("rect-y");
    let rw = getElementValue("rect-width");
    let rh = getElementValue("rect-height");

    [color, solidLine, lineWidth] = getDrawingDetails('rectangle');

    canvasMain.drawRectangle(rx, ry, rw, rh, color, solidLine, lineWidth);

    drawRectModal.style.display = "none";
  }

  function drawCircle() {
    const drawCircleModal = document.getElementById("draw-circle-modal");

    let cx = getElementValue("circle-xCenter");
    let cy = getElementValue("circle-yCenter");
    let cr = getElementValue("circle-radius");

    [color, solidLine, lineWidth] = getDrawingDetails('circle');
  
    canvasMain.drawCircle(cx, cy, cr, color, solidLine, lineWidth);

    drawCircleModal.style.display = "none";
  }

  function drawArc() {
    const drawArcModal = document.getElementById("draw-arc-modal");

    let ax = getElementValue("arc-xCenter");
    let ay = getElementValue("arc-yCenter");
    let ar = getElementValue("arc-radius");
    let astart = getElementValue("arc-startAngle");
    let aend = getElementValue("arc-endAngle");
    let direction = document.getElementById("arc-cw").checked;
    [color, solidLine, lineWidth] = getDrawingDetails('arc');

    canvasMain.drawArc(ax, ay, ar, astart, aend, direction, color, solidLine, lineWidth);

    drawArcModal.style.display = "none";
  }

  function addText() {
    const addTextModal = document.getElementById("add-text-modal");

    let text = getElementValue("text-input");
    let x = getElementValue("text-x");
    let y = getElementValue("text-y");
    let fontSize = getElementValue("text-size");
    let fontColor = getElementValue("font-draw-color");
    let fontType = getElementValue("font-type");

    canvasMain.addText(text, x, y, fontSize, fontColor, fontType);

    addTextModal.style.display = "none";
  }

  function closeAllModals() {
    drawLineModal.style.display = "none";
    drawCircleModal.style.display = "none";
    drawRectModal.style.display = "none";
    drawArcModal.style.display = "none";
    addTextModal.style.display = "none";
    showShapesModal.style.display = "none";
  }

  function reDrawCanvas() {
    canvasMain.drawCanvas();
  }

  function reDrawCanvas2() {
    console.log(JSON.stringify(shapes, null, 2));

    let coordsArray = [];

    for (let key in shapes) {
      let shape = shapes[key];
      if (shape.type === "line") {
        let xStart = parseFloat(shape.x1);
        let yStart = parseFloat(shape.y1);
        let xEnd = parseFloat(shape.x2);
        let yEnd = parseFloat(shape.y2);
        coordsArray.push({ x: xStart, y: yStart });
        coordsArray.push({ x: xEnd, y: yEnd });
      } else if (shape.type === "rect") {
        let xStart = parseFloat(shape.rx);
        let yStart = parseFloat(shape.ry);
        let width = parseFloat(shape.rw);
        let height = parseFloat(shape.rh);
        coordsArray.push({ x: xStart, y: yStart });
        coordsArray.push({ x: xStart + width, y: yStart + height });
      } else if (shape.type === "circle") {
        let xCenter = parseFloat(shape.cx);
        let yCenter = parseFloat(shape.cy);
        let radius = parseFloat(shape.cr);

        coordsArray.push({ x: xCenter + radius, y: yCenter });
        coordsArray.push({ x: xCenter - radius, y: yCenter });
        coordsArray.push({ x: xCenter, y: yCenter + radius });
        coordsArray.push({ x: xCenter, y: yCenter - radius });
      } else if (shape.type === "arc") {
        let xCenter = parseFloat(shape.ax);
        let yCenter = parseFloat(shape.ay);
        let radius = parseFloat(shape.ar);

        coordsArray.push({ x: xCenter + radius, y: yCenter });
        coordsArray.push({ x: xCenter - radius, y: yCenter });
        coordsArray.push({ x: xCenter, y: yCenter + radius });
        coordsArray.push({ x: xCenter, y: yCenter - radius });
      }
    }
    drawCanvas(coordsArray);
    redrawShapes();
  }

  function redrawShapes() {
    for (let key in shapes) {
      let shape = shapes[key];
      if (shape.type === "line") {
        let xStart = parseFloat(shape.x1) * pixelsPerInch * scaleFactor;
        let yStart = parseFloat(shape.y1) * pixelsPerInch * scaleFactor;
        let xEnd = parseFloat(shape.x2) * pixelsPerInch * scaleFactor;
        let yEnd = parseFloat(shape.y2) * pixelsPerInch * scaleFactor;

        ctx.strokeStyle = shape.color;
        ctx.lineWidth = shape.lineWidth;
        ctx.setLineDash(shape.solidLine ? [] : [5, 5]);

        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();
        ctx.closePath();
      } else if (shape.type === "rect") {
        let xStart = parseFloat(shape.rx) * pixelsPerInch * scaleFactor;
        let yStart = parseFloat(shape.ry) * pixelsPerInch * scaleFactor;
        let width = parseFloat(shape.rw) * pixelsPerInch * scaleFactor;
        let height = parseFloat(shape.rh) * pixelsPerInch * scaleFactor;

        ctx.strokeStyle = shape.color;
        ctx.lineWidth = shape.lineWidth;
        ctx.setLineDash(shape.solidLine ? [] : [5, 15]);

        ctx.beginPath();
        ctx.rect(xStart, yStart, width, height);
        ctx.stroke();
        ctx.closePath();
      } else if (shape.type === "circle") {
        let xCenter = parseFloat(shape.cx) * pixelsPerInch * scaleFactor;
        let yCenter = parseFloat(shape.cy) * pixelsPerInch * scaleFactor;
        let radius = parseFloat(shape.cr) * pixelsPerInch * scaleFactor;

        ctx.strokeStyle = shape.color;
        ctx.lineWidth = shape.lineWidth;
        ctx.setLineDash(shape.solidLine ? [] : [5, 25]);

        ctx.beginPath();
        ctx.arc(xCenter, yCenter, radius, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
      } else if (shape.type === "arc") {
        let xCenter = parseFloat(shape.ax) * pixelsPerInch * scaleFactor;
        let yCenter = parseFloat(shape.ay) * pixelsPerInch * scaleFactor;
        let radius = parseFloat(shape.ar) * pixelsPerInch * scaleFactor;
        // convert to radians
        let start = parseFloat(shape.astart) * (Math.PI / 180);
        let end = parseFloat(shape.aend) * (Math.PI / 180);
        let direction = shape.direction;

        ctx.strokeStyle = shape.color;
        ctx.lineWidth = shape.lineWidth;
        ctx.setLineDash(shape.solidLine ? [] : [5, 25]);

        ctx.beginPath();
        ctx.arc(xCenter, yCenter, radius, start, end, direction);
        ctx.stroke();
        ctx.closePath();
      } else if (shape.type === "text") {
        let x = parseFloat(shape.x) * pixelsPerInch * scaleFactor;
        let y = parseFloat(shape.y) * pixelsPerInch * scaleFactor;
        let fontSize = parseFloat(shape.fontSize) * scaleFactor;
        console.log(`x: ${x}`);
        console.log(`y: ${y}`);
        console.log(`fontSize: ${fontSize}`);
        console.log(`shape.text: ${shape.text}`);

        ctx.scale(1, -1);
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = shape.color;
        ctx.textBaseline = "top";
        ctx.fillText(shape.text, x, y);
        ctx.scale(1, -1);
        ctx.closePath();
      }
    }
  }
