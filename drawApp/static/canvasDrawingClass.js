class DrawingCanvas {
  constructor(elementId) {
    const targetElement = document.getElementById(elementId);
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

    this.ctx = this.canvasElement.getContext("2d");
    this.ctx.setLineDash([]);
    this.ctx.strokeStyle = "black";
    this.ctx.fillStyle = "black";
    this.ctx.lineWidth = 1;

    // Apply styles directly to the canvasElement
    this.canvasElement.style.position = 'absolute';
    this.canvasElement.style.backgroundColor = 'var(--graphics-background)'; // Ensure this variable is defined in your CSS
    this.canvasElement.style.top = '0';
    this.canvasElement.style.left = '0';
    this.canvasElement.style.width = '100%';
    this.canvasElement.style.height = '100%';
    this.canvasElement.style.display = 'block';

    // Define new fields for scale factors and global scale
    this.scaleXMid = 0;
    this.scaleYMid = 0;
    this.scaleFactor = 1;
    this.globalCanvasScale = 1.5;
    this.pixelsPerInch = 100;
    this.left_right_shift = 0;
    this.up_down_shift = 0;
    this.shapes = [];
    this.shapesCounter = 0;
  }

  drawCanvas() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    // Update canvas element's drawing buffer size
    this.canvasElement.width = this.width;
    this.canvasElement.height = this.height;
    
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.width, this.height);

    let coords = this.getCoordsFromShapes();
    this.calculateScaleFactor(coords);

    let shiftX = (this.scaleXMid + this.left_right_shift) * this.pixelsPerInch * this.scaleFactor;
    let shiftY = (this.scaleYMid + this.up_down_shift) * this.pixelsPerInch * this.scaleFactor;
    
    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.scale(1, -1);
    this.ctx.translate(-shiftX, -shiftY);
    this.drawShapes();
  }

  getCoordsFromShapes() {
    let coordsArray = [];
    for (let i = 0; i < this.shapes.length; i++) {
      let shape = this.shapes[i];
      if (shape.type === "line") {
        let xStart = parseFloat(shape.x1);
        let yStart = parseFloat(shape.y1);
        let xEnd = parseFloat(shape.x2);
        let yEnd = parseFloat(shape.y2);
        coordsArray.push({ x: xStart, y: yStart });
        coordsArray.push({ x: xEnd, y: yEnd });
      } else if (shape.type === "rectangle") {
        let xStart = parseFloat(shape.x1);
        let yStart = parseFloat(shape.y1);
        let width = parseFloat(shape.width);
        let height = parseFloat(shape.height);
        coordsArray.push({ x: xStart, y: yStart });
        coordsArray.push({ x: xStart + width, y: yStart + height });
      } else if (shape.type === "circle") {
        let xCenter = parseFloat(shape.x);
        let yCenter = parseFloat(shape.y);
        let radius = parseFloat(shape.radius);
        coordsArray.push({ x: xCenter + radius, y: yCenter });
        coordsArray.push({ x: xCenter - radius, y: yCenter });
        coordsArray.push({ x: xCenter, y: yCenter + radius });
        coordsArray.push({ x: xCenter, y: yCenter - radius });
      } else if (shape.type === "arc") {
        let xCenter = parseFloat(shape.x);
        let yCenter = parseFloat(shape.y);
        let radius = parseFloat(shape.radius);
        coordsArray.push({ x: xCenter + radius, y: yCenter });
        coordsArray.push({ x: xCenter - radius, y: yCenter });
        coordsArray.push({ x: xCenter, y: yCenter + radius });
        coordsArray.push({ x: xCenter, y: yCenter - radius });
      } else if (shape.type === "text") {
        let x = parseFloat(shape.x);
        let y = parseFloat(shape.y);
        coordsArray.push({ x: x, y: y });
      }
    }
    return coordsArray;
  }

  // Add the calculateScaleFactor method
  calculateScaleFactor(coords) {
    let minX = Math.min(...coords.map(coord => coord.x));
    let maxX = Math.max(...coords.map(coord => coord.x));
    let minY = Math.min(...coords.map(coord => coord.y));
    let maxY = Math.max(...coords.map(coord => coord.y));

    this.scaleXMid = (maxX + minX) / 2;
    this.scaleYMid = (minY + maxY) / 2;
    let xLength = maxX - minX;
    let yLength = maxY - minY;
    let xLengthScale = xLength * this.globalCanvasScale;
    let yLengthScale = yLength * this.globalCanvasScale;
    let scaleX = this.width / (xLengthScale * this.pixelsPerInch);
    let scaleY = this.height / (yLengthScale * this.pixelsPerInch);
    this.scaleFactor = Math.min(scaleX, scaleY);
    if (this.scaleFactor === Infinity) {
      this.scaleFactor = 1;
    }
  }

  drawShapes() {
    for (let i = 0; i < this.shapes.length; i++) {
      let shape = this.shapes[i];
      
      if (shape.type === "line") {
        const x1 = this.scaleDimension(shape.x1);
        const y1 = this.scaleDimension(shape.y1);
        const x2 = this.scaleDimension(shape.x2);
        const y2 = this.scaleDimension(shape.y2);
        this.ctx.strokeStyle = shape.color;
        this.ctx.lineWidth = shape.lineWidth;
        this.setLineDash(shape.solidLine);
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (shape.type === "rectangle") {
        const x = this.scaleDimension(shape.x1);
        const y = this.scaleDimension(shape.y1);
        const width = this.scaleDimension(shape.width);
        const height = this.scaleDimension(shape.height);
        this.ctx.strokeStyle = shape.color;
        this.ctx.lineWidth = shape.lineWidth;
        this.setLineDash(shape.solidLine);
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (shape.type === "circle") {
        const x = this.scaleDimension(shape.x);
        const y = this.scaleDimension(shape.y);
        const radius = this.scaleDimension(shape.radius);
        this.ctx.strokeStyle = shape.color;
        this.ctx.lineWidth = shape.lineWidth;
        this.setLineDash(shape.solidLine);
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (shape.type === "arc") {
        const x = this.scaleDimension(shape.x);
        const y = this.scaleDimension(shape.y);
        const radius = this.scaleDimension(shape.radius);
        const startAngle = this.angleInRadians(shape.startAngle);
        const endAngle = this.angleInRadians(shape.endAngle);
        this.ctx.strokeStyle = shape.color;
        this.ctx.lineWidth = shape.lineWidth;
        this.setLineDash(shape.solidLine);
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, startAngle, endAngle, shape.direction);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (shape.type === "text") {
        const x = this.scaleDimension(shape.x);
        const y = this.scaleDimension(shape.y);
        const fontSize = shape.fontSize * this.scaleFactor;;
        this.ctx.scale(1, -1);
        this.ctx.font = `${fontSize}px ${shape.fontType}`;
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = shape.color;
        this.ctx.fillText(shape.text, x, y);
        this.ctx.scale(1, -1);
        this.ctx.closePath();
      }
    }
  }

  drawLine(x1, x2, y1, y2, color, solidLine, lineWidth) {
    const type = "line";
    let line = {}
    line = {
      "type": type,
      "id": this.shapesCounter,
      "x1": x1,
      "y1": y1,
      "x2": x2,
      "y2": y2,
      "color": color,
      "solidLine": solidLine,
      "lineWidth": lineWidth
    }
    this.shapes.push(line);
    this.shapesCounter++;
  }

  drawRectangle(x1, y1, width, height, color, solidLine, lineWidth) {
    const type = "rectangle";
    let rectangle = {};
    rectangle = {
      "type": type,
      "id": this.shapesCounter,
      "x1": x1,
      "y1": y1,
      "width": width,
      "height": height,
      "color": color,
      "solidLine": solidLine,
      "lineWidth": lineWidth
    }
    this.shapes.push(rectangle);
    this.shapesCounter++;
  }

  drawCircle(x, y, radius, color, solidLine, lineWidth) {
    const type = "circle";
    let circle = {};
    circle = {
      "type": type,
      "id": this.shapesCounter,
      "x": x,
      "y": y,
      "radius": radius,
      "color": color,
      "solidLine": solidLine,
      "lineWidth": lineWidth
    }
    this.shapes.push(circle);
    this.shapesCounter++;
  }

  drawArc(x, y, radius, startAngle, endAngle, direction, color, solidLine, lineWidth) {
    const type = "arc";
    let arc = {};
    arc = {
      "type": type,
      "id": this.shapesCounter,
      "x": x,
      "y": y,
      "radius": radius,
      "startAngle": startAngle,
      "endAngle": endAngle,
      "direction": direction,
      "color": color,
      "solidLine": solidLine,
      "lineWidth": lineWidth
    }
    this.shapes.push(arc);
    this.shapesCounter++;
  }

  addText(text, x, y, fontSize, color, fontType) {
    const type = "text";
    let textObj = {};
    textObj = {
      "type": type,
      "id": this.shapesCounter,
      "text": text,
      "x": x,
      "y": y,
      "fontSize": fontSize,
      "color": color,
      "fontType": fontType
    }
    this.shapes.push(textObj);
    this.shapesCounter++;
  }

  scaleDimension(dimension) {
    return parseFloat(dimension) * this.pixelsPerInch * this.scaleFactor;
  }

  angleInRadians(angle) {
    return (parseFloat(angle) * (Math.PI / 180));
  }

  setLineDash(isSolid) {
    if (isSolid == "false" || isSolid == false) {
      this.ctx.setLineDash([8, 8]);
      console.log("dashed line called")
    } else {
      console.log("solid line called")
      this.ctx.setLineDash([]);
    }
  }

  setGlobalCanvasScale(scale) {
    this.globalCanvasScale = scale;
    this.drawCanvas()
  }

  deleteShape(id) {
    this.shapes = this.shapes.filter(shape => shape.id.toString() !== id.toString());
  }

  logShapeData() {
    console.log(JSON.stringify(this.shapes, null, 2));
  }

  getShapeData() {
    return this.shapes;
  }

  getShape(key) {
    return this.shapes.find(shape => shape.id.toString() === key.toString());
  }

  loadShapeData(data) {
    this.shapes = data;
    this.shapesCounter = data.length;
  } 
  

  editShape(key, attr, value) {
    let shape = this.getShape(key);
    if (shape) {
      shape[attr] = value;
    } else {
      console.error(`Shape not found for key: ${key}`);
    }
  }
  

  

  // settings: lineWidth, color, solidLine, etc.
  // Other methods for your class...
}
