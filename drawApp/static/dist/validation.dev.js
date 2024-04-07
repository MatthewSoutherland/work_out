"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

// Regex to match a floating-point number, includes + or - at beginning and a decimal
var numberRegex = /^[+-]?([0-9]*[.])?[0-9]+$/; // Regular expression to match valid characters: letters, numbers, dots, underscores, and hyphens

var validFileNamePattern = /^[a-zA-Z0-9._-]+$/; // FROM SUBMIT.JS

function validateData(requiredFields) {
  unit = currentUnitVisability;
  var isValid = true;
  var container = document.getElementById(unit);
  requiredFields.forEach(function (fieldId) {
    console.log("fieldId: ".concat(fieldId));
    var element = document.getElementById(fieldId);

    if (element.value === "" || element.value === null) {
      isValid = false;
      element.style.borderColor = "red";
    } else {
      element.style.borderColor = "";
    }
  }); // Validate if input is empty make 0

  var makeZeroElements = container.querySelectorAll(".validate-make-zero");
  makeZeroElements.forEach(function (ele) {
    if (ele.value == "" || ele.value == null) {
      ele.value = 0;
    }
  }); // Validate input is integer

  var integerElements = container.querySelectorAll(".validate-to-int");
  integerElements.forEach(function (ele) {
    var roundedInput = Math.round(ele.value);
    ele.value = roundedInput;
  }); // Validate input is a number and a positive number

  var positiveIntegerElements = container.querySelectorAll(".validate-positive-number");
  positiveIntegerElements.forEach(function (ele) {
    var inputValue = ele.value; // Check if the value is a string (excluding string representation of numbers)

    if (isNaN(inputValue) || inputValue.trim() === "") {
      ele.value = "";
    } // Check if the value is negative
    else if (Number(inputValue) < 0) {
        ele.value = (-1 * Number(inputValue)).toString();
      }
  });

  if (unit == "face-top") {
    // Validate input value is less than face value
    var lessThanFace = container.querySelectorAll(".validate-less-than-face");
    var faceNumber = container.querySelector(".validate-face");
    var faceValue = parseFloat(faceNumber.value);
    lessThanFace.forEach(function (ele) {
      var inputValue = parseFloat(ele.value);

      if (inputValue > faceValue) {
        ele.value = (-1 * inputValue).toString();
      }
    });
  }

  if (!isValid) {
    alert("Please fill in the highlighted fields.");
  }

  return isValid;
} // FROM COORDINATES BUILDER.JS


function validateNumericValue(value) {
  return numberRegex.test(value);
} // if value does not include a '.' add '.0' to the end


function validateTrailingZero(value) {
  if (!value.includes('.')) {
    var v = value + ".0";
    return v;
  } else {
    return value;
  }
} // FROM FILE MANAGER.JS


function validateOpeningValues() {
  var fileExt = getElementValue("file-extension-dropdown");
  var machine = getElementValue("mill-machine-dropdown");
  var material = getElementValue("material-dropdown");
  var fileName = getElementValue("file-name-input");

  if (!fileExt || fileExt === "none") {
    document.getElementById("file-extension-dropdown").classList.add("red-border");
    alert("select a valid file extension");
    return false;
  }

  if (!machine || machine === "none") {
    document.getElementById("mill-machine-dropdown").classList.add("red-border");
    alert("select a machine");
    return false;
  }

  if (!material || material === "none") {
    document.getElementById("material-dropdown").classList.add("red-border");
    alert("select a material");
    return false;
  } // Check the file name against the pattern and length requirements


  if (!fileName || fileName === "none") {
    document.getElementById("file-name-input").classList.add("red-border");
    alert("Enter Name File");
    return false;
  } else if (fileName.length > 100) {
    document.getElementById("file-name-input").classList.add("red-border");
    alert("File name is too long. Maximum length is 100 characters.");
    return false;
  } else if (!validFileNamePattern.test(fileName)) {
    document.getElementById("file-name-input").classList.add("red-border");
    alert("File name contains invalid characters. Only letters, numbers, dots, underscores, and hyphens are allowed.");
    return false;
  }

  return true;
}

function validateFileDoesNotAlreadyExist() {
  var fileInputValue = document.getElementById('file-name-input').value;
  var dropdown = document.getElementById('existing-files-dropdown');
  var options = dropdown.options;
  var fileExists = false; // Loop through the options

  for (var i = 0; i < options.length; i++) {
    var optionValueWithoutExtension = options[i].value.replace(/\.[^/.]+$/, ""); // Remove the extension from the dropdown value

    if (optionValueWithoutExtension === fileInputValue) {
      fileExists = (_readOnlyError("fileExists"), true);
      break;
    }
  }

  return fileExists;
} // COORDINATES MODAL.JS


function validateObjectIsNotEmpty(obj) {
  return Object.keys(obj).length === 0;
} // INDEX CALCULATOR.JS


function validateElementValueIsNumber(elementId) {
  var element = document.getElementById(elementId); // Check if the element exists and has a value

  if (element && element.value) {
    // Check if the value matches the numberRegex pattern
    if (numberRegex.test(element.value)) {
      return element.value;
    } else {
      // If the value doesn't match, send an alert and return null
      alert("The value is not a valid number.");
      return null;
    }
  } else {
    // If the element doesn't exist or doesn't have a value, return null
    return null;
  }
}

function getElementValue(elementId) {
  var element = document.getElementById(elementId);
  return element && element.value ? element.value : null;
}