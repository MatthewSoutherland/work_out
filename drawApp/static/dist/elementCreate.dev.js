"use strict";

function createElement(tag) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  var element = document.createElement(tag);
  Object.keys(attributes).forEach(function (attr) {
    if (attributes[attr] !== null && attributes[attr] !== undefined) {
      element.setAttribute(attr, attributes[attr]);
    }
  });
  if (text) element.textContent = text;
  return element;
}

function getElementValue(elementId) {
  var element = document.getElementById(elementId);
  return element && element.value ? element.value : null;
}