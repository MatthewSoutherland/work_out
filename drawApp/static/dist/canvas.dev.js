"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var pixelsPerInch = 100;
var topMargin = 60;
var bottomMargin = 30;
var leftMargin = 20;
var scaleFactor;
var canvasWidth;
var canvasHeight;
var ctx;
var globalCanvasScale = 1.5;
var left_right_shift = 0;
var up_down_shift = 0;
var canvas; // function to initialize the canvas domcontentloaded

canvas = document.getElementById("canvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
drawCanvas([{
  x: 0,
  y: 0
}]); // Function to draw the canvas

function drawCanvas(coordinates) {
  globalCanvasScale = document.getElementById("canvas-scale-factor").value;
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  canvasWidth = canvas.width - leftMargin;
  canvasHeight = canvas.height - topMargin - bottomMargin;
  ctx = canvas.getContext("2d");
  ctx.setLineDash([]);
  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset to the default transform

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var scaleFactorItems = calculateScaleFactor(coordinates);
  drawScale(ctx, canvasWidth, canvasHeight, scaleFactorItems);
  scaleFactor = scaleFactorItems[0]; // ctx.restore();
} // Function to calculate scale factor


function calculateScaleFactor(coords) {
  var minX = Math.min.apply(Math, _toConsumableArray(coords.map(function (coord) {
    return coord.x;
  })));
  var maxX = Math.max.apply(Math, _toConsumableArray(coords.map(function (coord) {
    return coord.x;
  })));
  var minY = Math.min.apply(Math, _toConsumableArray(coords.map(function (coord) {
    return coord.y;
  })));
  var maxY = Math.max.apply(Math, _toConsumableArray(coords.map(function (coord) {
    return coord.y;
  })));
  var scaleXMid = (maxX + minX) / 2;
  var scaleYMid = (minY + maxY) / 2;
  var xLength = maxX - minX;
  var yLength = maxY - minY;
  var xLengthScale = xLength * globalCanvasScale;
  var yLengthScale = yLength * globalCanvasScale;
  var scaleX = canvasWidth / (xLengthScale * pixelsPerInch);
  var scaleY = canvasHeight / (yLengthScale * pixelsPerInch);
  var min = Math.min(scaleX, scaleY);

  if (min === Infinity) {
    min = 1;
  }

  return [min, scaleXMid, scaleYMid];
} // Function to draw scale


function drawScale(ctx, canvasWidth, canvasHeight, scaleFactor) {
  var axisColor = "black";
  var markLength = 8; // Length of each scale mark

  ctx.strokeStyle = axisColor;
  ctx.fillStyle = axisColor;
  ctx.lineWidth = 1;
  var interval = 40; // frequency of scale marks

  var _scaleFactor = _slicedToArray(scaleFactor, 3),
      sf = _scaleFactor[0],
      midX = _scaleFactor[1],
      midY = _scaleFactor[2];

  shiftX = (midX + left_right_shift) * pixelsPerInch * sf; // to center in px and scaled

  shiftY = (midY + up_down_shift) * pixelsPerInch * sf; // to center in px and scaled
  // moving zeros to center

  ctx.translate(canvasWidth / 2 + leftMargin, canvasHeight / 2 + topMargin);
  ctx.scale(1, -1); // ctx.translate(1, 1); // This moved entire canvas postive x and y about 1 inch

  ctx.translate(-shiftX, -shiftY); // center of canvas now at scaled center of part

  ctx.scale(1, -1); // Drawing X-axis labels. Making sure we have the center of the graph pegged so going from center out

  for (var x = shiftX; x <= canvasWidth / 2 + shiftX; x += interval) {
    var inchMark = (x / pixelsPerInch / sf).toFixed(2);
    ctx.beginPath();
    ctx.moveTo(x, canvasHeight / 2 - shiftY);
    ctx.lineTo(x, canvasHeight / 2 + markLength - shiftY);
    ctx.stroke();
    ctx.fillText(inchMark + '"', x - markLength, canvasHeight / 2 - shiftY - markLength); // Adjust text label position
  }

  for (var _x = -interval + shiftX; _x >= -canvasWidth / 2 + shiftX; _x -= interval) {
    var _inchMark = (_x / pixelsPerInch / sf).toFixed(2);

    ctx.beginPath();
    ctx.moveTo(_x, canvasHeight / 2 - shiftY);
    ctx.lineTo(_x, canvasHeight / 2 + markLength - shiftY);
    ctx.stroke();
    ctx.fillText(_inchMark + '"', _x - markLength, canvasHeight / 2 - shiftY - markLength); // Adjust text label position
  } // Drawing Y-axis labels scale is going backward for text


  for (var y = shiftY; y <= canvasHeight / 2 + shiftY; y += interval) {
    var _inchMark2 = (y / pixelsPerInch / sf).toFixed(2);

    ctx.beginPath();
    ctx.moveTo(-canvasWidth / 2 - markLength + shiftX, -y);
    ctx.lineTo(-canvasWidth / 2 - markLength * 2 + shiftX, -y);
    ctx.stroke();
    ctx.fillText(_inchMark2 + '"', -canvasWidth / 2 + shiftX, -y); // Adjust text label position
  }

  for (var _y = -interval + shiftY; _y >= -canvasHeight / 2 + shiftY; _y -= interval) {
    var _inchMark3 = (_y / pixelsPerInch / sf).toFixed(2);

    ctx.beginPath();
    ctx.moveTo(-canvasWidth / 2 - markLength + shiftX, -_y);
    ctx.lineTo(-canvasWidth / 2 - markLength * 2 + shiftX, -_y);
    ctx.stroke();
    ctx.fillText(_inchMark3 + '"', -canvasWidth / 2 + shiftX, -_y); // Adjust text label position
  }

  ctx.scale(1, -1);
}