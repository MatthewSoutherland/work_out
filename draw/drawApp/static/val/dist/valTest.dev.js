"use strict";

function buildFeatureDataObject() {
  var featureInfo = unitFields[currentUnitVisability].featureData;
  var featureData = {};

  for (var key in featureInfo) {
    var fullId = "".concat(featureInfo[key]);
    featureData[key] = document.getElementById(fullId).value;
  }

  return featureData;
}

function buildToolDataObject(toolType) {
  var tool;
  var toolData = {};

  if (toolType == "drill" || toolType == "chamfer") {
    tool = unitFields[toolType];
  } else {
    tool = unitFields[currentUnitVisability][toolType];
  }

  for (var key in tool) {
    var fullId = "".concat(tool[key]);
    toolData[key] = document.getElementById(fullId).value;
  }

  return toolData;
}

function ifCheckedValidateToolFields(bool, toolType) {
  if (bool) {
    if (toolType == "drill" || toolType == "chamfer") {
      var toolIds = Object.values(unitFields[toolType]);
      toolIds.forEach(function (id) {
        if (!validateElementData(id)) {
          return false;
        }
      });
    } else {
      var _toolIds = Object.values(unitFields[currentUnitVisability][toolType]);

      _toolIds.forEach(function (id) {
        if (!validateElementData(id)) {
          return false;
        }
      });
    }
  }

  return true;
}

function submitDrillingData() {
  var featureDataIds = Object.values(unitFields[currentUnitVisability].featureData);
  featureDataIds.forEach(function (id) {
    var element = document.getElementById(id);
    var val = validateElementData(id);

    if (!val) {
      alert("Please fill out all required fields");
    }
  });

  if (!ifCheckedValidateToolFields(true, "drill")) {
    alert("tool shit returned false");
  }
}