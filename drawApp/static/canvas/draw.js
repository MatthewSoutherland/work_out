
  function getDrawingDetails() {
    const color = getElementValue("draw-color");
    const solidLine = document.getElementById("solid-line").checked;
    const lineWidth = getElementValue("line-width");

    if (solidLine) {
      ctx.setLineDash([]);
    } else {
      ctx.setLineDash([5, 15]);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    return [color, solidLine, lineWidth];
  }

  function updateShapesCounter() {
    shapesCounter = Object.keys(shapes).length;
  }

  function drawLine() {
    closeAllModals();
    const x1 = getElementValue("x1");
    const y1 = getElementValue("y1");
    const x2 = getElementValue("x2");
    const y2 = getElementValue("y2");
    // get color

    [color, solidLine, lineWidth] = getDrawingDetails();

    shapes[shapesCounter] = {
      type: "line",
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      color: color,
      solidLine: solidLine,
      lineWidth: lineWidth,
    };

    let xStart = parseFloat(x1) * pixelsPerInch * scaleFactor;
    let yStart = parseFloat(y1) * pixelsPerInch * scaleFactor;
    let xEnd = parseFloat(y2) * pixelsPerInch * scaleFactor;
    let yEnd = parseFloat(y2) * pixelsPerInch * scaleFactor;

    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
    ctx.closePath();

    shapesCounter++;
  }

  function drawRectangle() {
    closeAllModals();

    let rx = getElementValue("rx");
    let ry = getElementValue("ry");
    let rw = getElementValue("rw");
    let rh = getElementValue("rh");

    [color, solidLine, lineWidth] = getDrawingDetails();

    shapes[shapesCounter] = {
      type: "rect",
      rx: rx,
      ry: ry,
      rw: rw,
      rh: rh,
      color: color,
      solidLine: solidLine,
      lineWidth: lineWidth,
    };

    let scaled_x = parseFloat(rx) * pixelsPerInch * scaleFactor;
    let scaled_y = parseFloat(ry) * pixelsPerInch * scaleFactor;
    let scaled_w = parseFloat(rw) * pixelsPerInch * scaleFactor;
    let scaled_h = parseFloat(rh) * pixelsPerInch * scaleFactor;

    ctx.beginPath();
    ctx.rect(scaled_x, scaled_y, scaled_w, scaled_h);
    ctx.stroke();
    ctx.closePath();
    shapesCounter++;
  }

  function drawCircle() {
    closeAllModals();

    let cx = getElementValue("cx");
    let cy = getElementValue("cy");
    let cr = getElementValue("cr");

    [color, solidLine, lineWidth] = getDrawingDetails();

    shapes[shapesCounter] = {
      type: "circle",
      cx: cx,
      cy: cy,
      cr: cr,
      color: color,
      solidLine: solidLine,
      lineWidth: lineWidth,
    };

    let scaled_x = parseFloat(cx) * pixelsPerInch * scaleFactor;
    let scaled_y = parseFloat(cy) * pixelsPerInch * scaleFactor;
    let scaled_r = parseFloat(cr) * pixelsPerInch * scaleFactor;

    ctx.beginPath();
    ctx.arc(scaled_x, scaled_y, scaled_r, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();

    shapesCounter++;
  }

  function drawArc() {
    closeAllModals();

    let ax = getElementValue("ax");
    let ay = getElementValue("ay");
    let ar = getElementValue("ar");
    let astart = getElementValue("as");
    let aend = getElementValue("ae");
    let direction = document.getElementById("cw").checked;
    [color, solidLine, lineWidth] = getDrawingDetails();

    shapes[shapesCounter] = {
      type: "arc",
      ax: ax,
      ay: ay,
      ar: ar,
      astart: astart,
      aend: aend,
      direction: direction,
      color: color,
      solidLine: solidLine,
      lineWidth: lineWidth,
    };

    let scaled_x = parseFloat(ax) * pixelsPerInch * scaleFactor;
    let scaled_y = parseFloat(ay) * pixelsPerInch * scaleFactor;
    let scaled_r = parseFloat(ar) * pixelsPerInch * scaleFactor;
    // convert to radians
    let scaled_start = parseFloat(astart) * (Math.PI / 180);
    let scaled_end = parseFloat(aend) * (Math.PI / 180);

    ctx.beginPath();
    ctx.arc(scaled_x, scaled_y, scaled_r, scaled_start, scaled_end, direction);
    ctx.stroke();
    ctx.closePath();

    shapesCounter++;
  }

  function addText() {
    closeAllModals();

    let text = getElementValue("text");
    let x = getElementValue("tx");
    let y = getElementValue("ty");
    let fontSize = getElementValue("tsize");

    [color, solidLine, lineWidth] = getDrawingDetails();

    shapes[shapesCounter] = {
      type: "text",
      text: text,
      x: x,
      y: y,
      fontSize: fontSize,
      color: color,
      solidLine: solidLine,
      lineWidth: lineWidth,
    };

    let scaledX = parseFloat(x) * pixelsPerInch * scaleFactor;
    let scaledY = parseFloat(y) * pixelsPerInch * scaleFactor;
    let scaledFontSize = parseFloat(fontSize) * scaleFactor;

    ctx.scale(1, -1);
    ctx.font = `${scaledFontSize}px Arial`;
    ctx.fillStyle = color;
    ctx.textBaseline = "top";
    ctx.fillText(text, scaledX, scaledY);
    ctx.scale(1, -1);
    ctx.closePath();
    shapesCounter++;
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
