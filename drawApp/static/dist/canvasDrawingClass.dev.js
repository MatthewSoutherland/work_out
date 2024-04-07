"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DrawingCanvas =
/*#__PURE__*/
function () {
  function DrawingCanvas(elementId) {
    _classCallCheck(this, DrawingCanvas);

    var targetElement = document.getElementById(elementId);

    if (!targetElement) {
      throw new Error("Element not found");
    }

    this.container = targetElement;
    this.width = targetElement.offsetWidth;
    this.height = targetElement.offsetHeight;
    this.canvasElement = document.createElement("canvas");
    this.canvasElement.width = this.width;
    this.canvasElement.height = this.height;
    targetElement.appendChild(this.canvasElement);
    this.ctx = this.canvasElement.getContext("2d"); // Apply styles directly to the canvasElement

    this.canvasElement.style.position = 'absolute';
    this.canvasElement.style.backgroundColor = 'var(--graphics-background)'; // Ensure this variable is defined in your CSS

    this.canvasElement.style.top = '0';
    this.canvasElement.style.left = '0';
    this.canvasElement.style.width = '100%';
    this.canvasElement.style.height = '100%';
    this.canvasElement.style.display = 'block'; // Define new fields for scale factors and global scale

    this.scaleXMid = 0;
    this.scaleYMid = 0;
    this.scaleFactor = 1;
    this.globalCanvasScale = 1.5;
    this.pixelsPerInch = 100;
    this.left_right_shift = 0;
    this.up_down_shift = 0;
    this.shapes = [];
  }

  _createClass(DrawingCanvas, [{
    key: "drawCanvas",
    value: function drawCanvas() {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight; // Update canvas element's drawing buffer size

      this.canvasElement.width = this.width;
      this.canvasElement.height = this.height;
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.width, this.height);
      var coords = this.getCoordsFromShapes();
      this.calculateScaleFactor(coords);
      this.ctx.setLineDash([]);
      this.ctx.strokeStyle = "black";
      this.ctx.fillStyle = "black";
      this.ctx.lineWidth = 1;
      var shiftX = (this.scaleXMid + this.left_right_shift) * this.pixelsPerInch * this.scaleFactor;
      var shiftY = (this.scaleYMid + this.up_down_shift) * this.pixelsPerInch * this.scaleFactor;
      this.ctx.translate(this.width / 2, this.height / 2);
      this.ctx.scale(1, -1);
      this.ctx.translate(-shiftX, -shiftY);
      this.drawShapes();
    }
  }, {
    key: "getCoordsFromShapes",
    value: function getCoordsFromShapes() {
      var coordsArray = [];

      for (var i = 0; i < this.shapes.length; i++) {
        var shape = this.shapes[i];

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
        } else if (shape.type === "rectangle") {
          var _xStart = parseFloat(shape.x1);

          var _yStart = parseFloat(shape.y1);

          var width = parseFloat(shape.width);
          var height = parseFloat(shape.height);
          coordsArray.push({
            x: _xStart,
            y: _yStart
          });
          coordsArray.push({
            x: _xStart + width,
            y: _yStart + height
          });
        } else if (shape.type === "circle") {
          var xCenter = parseFloat(shape.x);
          var yCenter = parseFloat(shape.y);
          var radius = parseFloat(shape.radius);
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
          var _xCenter = parseFloat(shape.x);

          var _yCenter = parseFloat(shape.y);

          var _radius = parseFloat(shape.radius);

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

      return coordsArray;
    } // Add the calculateScaleFactor method

  }, {
    key: "calculateScaleFactor",
    value: function calculateScaleFactor(coords) {
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
      this.scaleXMid = (maxX + minX) / 2;
      this.scaleYMid = (minY + maxY) / 2;
      var xLength = maxX - minX;
      var yLength = maxY - minY;
      var xLengthScale = xLength * this.globalCanvasScale;
      var yLengthScale = yLength * this.globalCanvasScale;
      var scaleX = this.width / (xLengthScale * this.pixelsPerInch);
      var scaleY = this.height / (yLengthScale * this.pixelsPerInch);
      this.scaleFactor = Math.min(scaleX, scaleY);

      if (this.scaleFactor === Infinity) {
        this.scaleFactor = 1;
      }
    }
  }, {
    key: "drawShapes",
    value: function drawShapes() {
      for (var i = 0; i < this.shapes.length; i++) {
        var shape = this.shapes[i];

        if (shape.type === "line") {
          var x1 = this.scaleDimension(shape.x1);
          var y1 = this.scaleDimension(shape.y1);
          var x2 = this.scaleDimension(shape.x2);
          var y2 = this.scaleDimension(shape.y2);
          this.ctx.beginPath();
          this.ctx.moveTo(x1, y1);
          this.ctx.lineTo(x2, y2);
          this.ctx.stroke();
          this.ctx.closePath();
        } else if (shape.type === "rectangle") {
          var x = this.scaleDimension(shape.x1);
          var y = this.scaleDimension(shape.y1);
          var width = this.scaleDimension(shape.width);
          var height = this.scaleDimension(shape.height);
          this.ctx.beginPath();
          this.ctx.rect(x, y, width, height);
          this.ctx.stroke();
          this.ctx.closePath();
        } else if (shape.type === "circle") {
          var _x = this.scaleDimension(shape.x);

          var _y = this.scaleDimension(shape.y);

          var radius = this.scaleDimension(shape.radius);
          this.ctx.beginPath();
          this.ctx.arc(_x, _y, radius, 0, 2 * Math.PI, false);
          this.ctx.stroke();
          this.ctx.closePath();
        } else if (shape.type === "arc") {
          var _x2 = this.scaleDimension(shape.x);

          var _y2 = this.scaleDimension(shape.y);

          var _radius2 = this.scaleDimension(shape.radius);

          var startAngle = this.angleInRadians(shape.startAngle);
          var endAngle = this.angleInRadians(shape.endAngle);
          this.ctx.beginPath();
          this.ctx.arc(_x2, _y2, _radius2, startAngle, endAngle, shape.direction);
          this.ctx.stroke();
          this.ctx.closePath();
        }
      }
    }
  }, {
    key: "drawLine",
    value: function drawLine(x1, x2, y1, y2) {
      var type = "line";
      var shape = {
        type: type,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
      };
      this.shapes.push(shape);
    }
  }, {
    key: "drawRectangle",
    value: function drawRectangle(x1, y1, width, height) {
      var type = "rectangle";
      var shape = {
        type: type,
        x1: x1,
        y1: y1,
        width: width,
        height: height
      };
      this.shapes.push(shape);
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(x, y, radius) {
      var type = "circle";
      var shape = {
        type: type,
        x: x,
        y: y,
        radius: radius
      };
      this.shapes.push(shape);
    }
  }, {
    key: "drawArc",
    value: function drawArc(x, y, radius, startAngle, endAngle) {
      var direction = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var type = "arc";
      var shape = {
        type: type,
        x: x,
        y: y,
        radius: radius,
        startAngle: startAngle,
        endAngle: endAngle,
        direction: direction
      };
      this.shapes.push(shape);
    }
  }, {
    key: "scaleDimension",
    value: function scaleDimension(dimension) {
      return parseFloat(dimension) * this.pixelsPerInch * this.scaleFactor;
    }
  }, {
    key: "angleInRadians",
    value: function angleInRadians(angle) {
      return parseFloat(angle) * Math.PI / 180;
    } // settings: lineWidth, color, solidLine, etc.
    // Other methods for your class...

  }]);

  return DrawingCanvas;
}();