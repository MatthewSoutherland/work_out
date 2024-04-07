"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getDrawingDetails() {
  var color = getElementValue("draw-color");
  var solidLine = document.getElementById("solid-line").checked;
  var lineWidth = getElementValue("line-width");

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
  var x1 = getElementValue("x1");
  var y1 = getElementValue("y1");
  var x2 = getElementValue("x2");
  var y2 = getElementValue("y2"); // get color

  var _getDrawingDetails = getDrawingDetails();

  var _getDrawingDetails2 = _slicedToArray(_getDrawingDetails, 3);

  color = _getDrawingDetails2[0];
  solidLine = _getDrawingDetails2[1];
  lineWidth = _getDrawingDetails2[2];
  shapes[shapesCounter] = {
    type: "line",
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    color: color,
    solidLine: solidLine,
    lineWidth: lineWidth
  };
  var xStart = parseFloat(x1) * pixelsPerInch * scaleFactor;
  var yStart = parseFloat(y1) * pixelsPerInch * scaleFactor;
  var xEnd = parseFloat(y2) * pixelsPerInch * scaleFactor;
  var yEnd = parseFloat(y2) * pixelsPerInch * scaleFactor;
  ctx.beginPath();
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(xEnd, yEnd);
  ctx.stroke();
  ctx.closePath();
  shapesCounter++;
}

function drawRectangle() {
  closeAllModals();
  var rx = getElementValue("rx");
  var ry = getElementValue("ry");
  var rw = getElementValue("rw");
  var rh = getElementValue("rh");

  var _getDrawingDetails3 = getDrawingDetails();

  var _getDrawingDetails4 = _slicedToArray(_getDrawingDetails3, 3);

  color = _getDrawingDetails4[0];
  solidLine = _getDrawingDetails4[1];
  lineWidth = _getDrawingDetails4[2];
  shapes[shapesCounter] = {
    type: "rect",
    rx: rx,
    ry: ry,
    rw: rw,
    rh: rh,
    color: color,
    solidLine: solidLine,
    lineWidth: lineWidth
  };
  var scaled_x = parseFloat(rx) * pixelsPerInch * scaleFactor;
  var scaled_y = parseFloat(ry) * pixelsPerInch * scaleFactor;
  var scaled_w = parseFloat(rw) * pixelsPerInch * scaleFactor;
  var scaled_h = parseFloat(rh) * pixelsPerInch * scaleFactor;
  ctx.beginPath();
  ctx.rect(scaled_x, scaled_y, scaled_w, scaled_h);
  ctx.stroke();
  ctx.closePath();
  shapesCounter++;
}

function drawCircle() {
  closeAllModals();
  var cx = getElementValue("cx");
  var cy = getElementValue("cy");
  var cr = getElementValue("cr");

  var _getDrawingDetails5 = getDrawingDetails();

  var _getDrawingDetails6 = _slicedToArray(_getDrawingDetails5, 3);

  color = _getDrawingDetails6[0];
  solidLine = _getDrawingDetails6[1];
  lineWidth = _getDrawingDetails6[2];
  shapes[shapesCounter] = {
    type: "circle",
    cx: cx,
    cy: cy,
    cr: cr,
    color: color,
    solidLine: solidLine,
    lineWidth: lineWidth
  };
  var scaled_x = parseFloat(cx) * pixelsPerInch * scaleFactor;
  var scaled_y = parseFloat(cy) * pixelsPerInch * scaleFactor;
  var scaled_r = parseFloat(cr) * pixelsPerInch * scaleFactor;
  ctx.beginPath();
  ctx.arc(scaled_x, scaled_y, scaled_r, 0, 2 * Math.PI, false);
  ctx.stroke();
  ctx.closePath();
  shapesCounter++;
}

function drawArc() {
  closeAllModals();
  var ax = getElementValue("ax");
  var ay = getElementValue("ay");
  var ar = getElementValue("ar");
  var astart = getElementValue("as");
  var aend = getElementValue("ae");
  var direction = document.getElementById("cw").checked;

  var _getDrawingDetails7 = getDrawingDetails();

  var _getDrawingDetails8 = _slicedToArray(_getDrawingDetails7, 3);

  color = _getDrawingDetails8[0];
  solidLine = _getDrawingDetails8[1];
  lineWidth = _getDrawingDetails8[2];
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
    lineWidth: lineWidth
  };
  var scaled_x = parseFloat(ax) * pixelsPerInch * scaleFactor;
  var scaled_y = parseFloat(ay) * pixelsPerInch * scaleFactor;
  var scaled_r = parseFloat(ar) * pixelsPerInch * scaleFactor; // convert to radians

  var scaled_start = parseFloat(astart) * (Math.PI / 180);
  var scaled_end = parseFloat(aend) * (Math.PI / 180);
  ctx.beginPath();
  ctx.arc(scaled_x, scaled_y, scaled_r, scaled_start, scaled_end, direction);
  ctx.stroke();
  ctx.closePath();
  shapesCounter++;
}

function addText() {
  closeAllModals();
  var text = getElementValue("text");
  var x = getElementValue("tx");
  var y = getElementValue("ty");
  var fontSize = getElementValue("tsize");

  var _getDrawingDetails9 = getDrawingDetails();

  var _getDrawingDetails10 = _slicedToArray(_getDrawingDetails9, 3);

  color = _getDrawingDetails10[0];
  solidLine = _getDrawingDetails10[1];
  lineWidth = _getDrawingDetails10[2];
  shapes[shapesCounter] = {
    type: "text",
    text: text,
    x: x,
    y: y,
    fontSize: fontSize,
    color: color,
    solidLine: solidLine,
    lineWidth: lineWidth
  };
  var scaledX = parseFloat(x) * pixelsPerInch * scaleFactor;
  var scaledY = parseFloat(y) * pixelsPerInch * scaleFactor;
  var scaledFontSize = parseFloat(fontSize) * scaleFactor;
  ctx.scale(1, -1);
  ctx.font = "".concat(scaledFontSize, "px Arial");
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
  var coordsArray = [];

  for (var key in shapes) {
    var shape = shapes[key];

    if (shape.type === "line") {
      var xStart = parseFloat(shape.x1);
      var yStart = parseFloat(shape.y1);
      var xEnd = parseFloat(shape.x2);
      var yEnd = parseFloat(shape.y2);
      coordsArray.push({
        x: xStart,
        y: yStart
      });
      coordsArray.push({
        x: xEnd,
        y: yEnd
      });
    } else if (shape.type === "rect") {
      var _xStart = parseFloat(shape.rx);

      var _yStart = parseFloat(shape.ry);

      var width = parseFloat(shape.rw);
      var height = parseFloat(shape.rh);
      coordsArray.push({
        x: _xStart,
        y: _yStart
      });
      coordsArray.push({
        x: _xStart + width,
        y: _yStart + height
      });
    } else if (shape.type === "circle") {
      var xCenter = parseFloat(shape.cx);
      var yCenter = parseFloat(shape.cy);
      var radius = parseFloat(shape.cr);
      coordsArray.push({
        x: xCenter + radius,
        y: yCenter
      });
      coordsArray.push({
        x: xCenter - radius,
        y: yCenter
      });
      coordsArray.push({
        x: xCenter,
        y: yCenter + radius
      });
      coordsArray.push({
        x: xCenter,
        y: yCenter - radius
      });
    } else if (shape.type === "arc") {
      var _xCenter = parseFloat(shape.ax);

      var _yCenter = parseFloat(shape.ay);

      var _radius = parseFloat(shape.ar);

      coordsArray.push({
        x: _xCenter + _radius,
        y: _yCenter
      });
      coordsArray.push({
        x: _xCenter - _radius,
        y: _yCenter
      });
      coordsArray.push({
        x: _xCenter,
        y: _yCenter + _radius
      });
      coordsArray.push({
        x: _xCenter,
        y: _yCenter - _radius
      });
    }
  }

  drawCanvas(coordsArray);
  redrawShapes();
}

function redrawShapes() {
  for (var key in shapes) {
    var shape = shapes[key];

    if (shape.type === "line") {
      var xStart = parseFloat(shape.x1) * pixelsPerInch * scaleFactor;
      var yStart = parseFloat(shape.y1) * pixelsPerInch * scaleFactor;
      var xEnd = parseFloat(shape.x2) * pixelsPerInch * scaleFactor;
      var yEnd = parseFloat(shape.y2) * pixelsPerInch * scaleFactor;
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = shape.lineWidth;
      ctx.setLineDash(shape.solidLine ? [] : [5, 5]);
      ctx.beginPath();
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.stroke();
      ctx.closePath();
    } else if (shape.type === "rect") {
      var _xStart2 = parseFloat(shape.rx) * pixelsPerInch * scaleFactor;

      var _yStart2 = parseFloat(shape.ry) * pixelsPerInch * scaleFactor;

      var width = parseFloat(shape.rw) * pixelsPerInch * scaleFactor;
      var height = parseFloat(shape.rh) * pixelsPerInch * scaleFactor;
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = shape.lineWidth;
      ctx.setLineDash(shape.solidLine ? [] : [5, 15]);
      ctx.beginPath();
      ctx.rect(_xStart2, _yStart2, width, height);
      ctx.stroke();
      ctx.closePath();
    } else if (shape.type === "circle") {
      var xCenter = parseFloat(shape.cx) * pixelsPerInch * scaleFactor;
      var yCenter = parseFloat(shape.cy) * pixelsPerInch * scaleFactor;
      var radius = parseFloat(shape.cr) * pixelsPerInch * scaleFactor;
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = shape.lineWidth;
      ctx.setLineDash(shape.solidLine ? [] : [5, 25]);
      ctx.beginPath();
      ctx.arc(xCenter, yCenter, radius, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.closePath();
    } else if (shape.type === "arc") {
      var _xCenter2 = parseFloat(shape.ax) * pixelsPerInch * scaleFactor;

      var _yCenter2 = parseFloat(shape.ay) * pixelsPerInch * scaleFactor;

      var _radius2 = parseFloat(shape.ar) * pixelsPerInch * scaleFactor; // convert to radians


      var start = parseFloat(shape.astart) * (Math.PI / 180);
      var end = parseFloat(shape.aend) * (Math.PI / 180);
      var direction = shape.direction;
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = shape.lineWidth;
      ctx.setLineDash(shape.solidLine ? [] : [5, 25]);
      ctx.beginPath();
      ctx.arc(_xCenter2, _yCenter2, _radius2, start, end, direction);
      ctx.stroke();
      ctx.closePath();
    } else if (shape.type === "text") {
      var x = parseFloat(shape.x) * pixelsPerInch * scaleFactor;
      var y = parseFloat(shape.y) * pixelsPerInch * scaleFactor;
      var fontSize = parseFloat(shape.fontSize) * scaleFactor;
      console.log("x: ".concat(x));
      console.log("y: ".concat(y));
      console.log("fontSize: ".concat(fontSize));
      console.log("shape.text: ".concat(shape.text));
      ctx.scale(1, -1);
      ctx.font = "".concat(fontSize, "px Arial");
      ctx.fillStyle = shape.color;
      ctx.textBaseline = "top";
      ctx.fillText(shape.text, x, y);
      ctx.scale(1, -1);
      ctx.closePath();
    }
  }
}