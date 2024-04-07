
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

  function reDrawCanvas() {
    canvasMain.drawCanvas();
  }
