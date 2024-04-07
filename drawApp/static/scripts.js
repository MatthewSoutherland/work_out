function calcSecondLineVertice() {
    const line_x1 = getElementValue("x1");
    const line_y1 = getElementValue("y1");
    const line_x2 = document.getElementById("x2");
    const line_y2 = document.getElementById("y2");
    const line_angle = getElementValue("line-angle");
    const line_length = getElementValue("line-length");

    const line_angle_radians = line_angle * Math.PI / 180;
    const new_x2 = line_length * Math.cos(line_angle_radians) + parseFloat(line_x1);
    const new_y2 = line_length * Math.sin(line_angle_radians) + parseFloat(line_y1);

    line_x2.value = new_x2.toFixed(4);
    line_y2.value = new_y2.toFixed(4);

}

function setCanvasGlobalScale() {
    const scale = getElementValue("canvas-scale-factor");
    canvasMain.setGlobalCanvasScale(scale)
}