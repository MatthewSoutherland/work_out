"use strict";

var canvasOne;
var canvasTwo;

function drawCanvasOne() {
  canvasOne = new DrawingCanvas('box-1');
  canvasOne.drawLine(0, 0, 1, 1);
  canvasOne.drawCircle(0, 0, 1);
  canvasOne.drawArc(.5, .5, .5, 0, 90, true);
  canvasOne.drawRectangle(0, 0, 1, 1);
}

function drawCanvasOne1() {
  canvasOne.drawCanvas();
}

function drawCanvasTwo() {
  canvasTwo = new DrawingCanvas('box-2');
  canvasTwo.drawLine(0, 2, 1, 1);
  canvasTwo.drawCircle(0, 0, 3);
}

function drawCanvasTwo1() {
  canvasTwo.drawCanvas();
}