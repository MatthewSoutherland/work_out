
  // Function to draw the canvas
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

    const scaleFactorItems = calculateScaleFactor(coordinates);
    drawScale(ctx, canvasWidth, canvasHeight, scaleFactorItems);

    scaleFactor = scaleFactorItems[0];
    // ctx.restore();
  }

  // Function to calculate scale factor
  function calculateScaleFactor(coords) {
    let minX = Math.min(...coords.map(coord => coord.x));
    let maxX = Math.max(...coords.map(coord => coord.x));
    let minY = Math.min(...coords.map(coord => coord.y));
    let maxY = Math.max(...coords.map(coord => coord.y));

    let scaleXMid = (maxX + minX) / 2;
    let scaleYMid = (minY + maxY) / 2;
    let xLength = maxX - minX;
    let yLength = maxY - minY;
    let xLengthScale = xLength * globalCanvasScale;
    let yLengthScale = yLength * globalCanvasScale;
    let scaleX = canvasWidth / (xLengthScale * pixelsPerInch);
    let scaleY = canvasHeight / (yLengthScale * pixelsPerInch);
    let min = Math.min(scaleX, scaleY);
    if (min === Infinity) {
      min = 1;
    }

    return [min, scaleXMid, scaleYMid];
  }

  // Function to draw scale
  function drawScale(ctx, canvasWidth, canvasHeight, scaleFactor) {
    const axisColor = "black";
    const markLength = 8; // Length of each scale mark
    ctx.strokeStyle = axisColor;
    ctx.fillStyle = axisColor;
    ctx.lineWidth = 1;
    const interval = 40; // frequency of scale marks
    let [sf, midX, midY] = scaleFactor;

    shiftX = (midX + left_right_shift) * pixelsPerInch * sf; // to center in px and scaled
    shiftY = (midY + up_down_shift) * pixelsPerInch * sf; // to center in px and scaled

    // moving zeros to center
    ctx.translate(canvasWidth / 2 + leftMargin, canvasHeight / 2 + topMargin);

    ctx.scale(1, -1);

    // ctx.translate(1, 1); // This moved entire canvas postive x and y about 1 inch
    ctx.translate(-shiftX, -shiftY); // center of canvas now at scaled center of part

    ctx.scale(1, -1);

    // Drawing X-axis labels. Making sure we have the center of the graph pegged so going from center out
    for (let x = shiftX; x <= canvasWidth / 2 + shiftX; x += interval) {
      let inchMark = (x / pixelsPerInch / sf).toFixed(2);
      ctx.beginPath();
      ctx.moveTo(x, canvasHeight / 2 - shiftY);
      ctx.lineTo(x, canvasHeight / 2 + markLength - shiftY);
      ctx.stroke();
      ctx.fillText(inchMark + '"', x - markLength, canvasHeight / 2 - shiftY - markLength); // Adjust text label position
    }
    for (let x = -interval + shiftX; x >= -canvasWidth / 2 + shiftX; x -= interval) {
      let inchMark = (x / pixelsPerInch / sf).toFixed(2);
      ctx.beginPath();
      ctx.moveTo(x, canvasHeight / 2 - shiftY);
      ctx.lineTo(x, canvasHeight / 2 + markLength - shiftY);
      ctx.stroke();
      ctx.fillText(inchMark + '"', x - markLength, canvasHeight / 2 - shiftY - markLength); // Adjust text label position
    }

    // Drawing Y-axis labels scale is going backward for text
    for (let y = shiftY; y <= canvasHeight / 2 + shiftY; y += interval) {
      let inchMark = (y / pixelsPerInch / sf).toFixed(2);
      ctx.beginPath();
      ctx.moveTo(-canvasWidth / 2 - markLength + shiftX, -y);
      ctx.lineTo(-canvasWidth / 2 - markLength * 2 + shiftX, -y);
      ctx.stroke();
      ctx.fillText(inchMark + '"', -canvasWidth / 2 + shiftX, -y); // Adjust text label position
    }
    for (let y = -interval + shiftY; y >= -canvasHeight / 2 + shiftY; y -= interval) {
      let inchMark = (y / pixelsPerInch / sf).toFixed(2);
      ctx.beginPath();
      ctx.moveTo(-canvasWidth / 2 - markLength + shiftX, -y);
      ctx.lineTo(-canvasWidth / 2 - markLength * 2 + shiftX, -y);
      ctx.stroke();
      ctx.fillText(inchMark + '"', -canvasWidth / 2 + shiftX, -y); // Adjust text label position
    }
    ctx.scale(1, -1);
  }
