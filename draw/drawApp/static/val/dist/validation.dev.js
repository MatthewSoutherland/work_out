"use strict";

/*
VALIDATION CLASS LIST:
is-numeric, is-whole-number, is-positive-number, make-zero, less-than-face, higher-than-face, make-negative, is-percentage, trailing-zero, is-not-empty
VALIDATION TO ADD:
zero-or-greater, higher-than-stock, less-than-diameter
*/
// CHECK IF ELEMENT EXISTS, CHECK IF ELEMENT HAS A VALUE, CHECK DATA-VALIDATE FIELD.
function validateElementData(elementId) {
  var listOfElementsNoValue = ["drill-peckDistance", "rouger-nose-radius"];
  var resultsContainer = document.getElementById("more-results");
  var unit = currentUnitVisability;
  var isValid = true;
  var element = document.getElementById(elementId);

  if (!element) {
    // should probably send email to dev team
    alert("The element does not exist.");
    return false;
  }

  if (!listOfElementsNoValue.includes(element.id)) {
    if (!getElementValue(elementId)) {
      element.classList.add("red-border");
      return false;
    }
  }

  resultsContainer.innerText += "Element with id ".concat(elementId, " exists\n\n");
  var dataList = element.getAttribute("data-validation");

  if (!dataList) {
    return true;
  }

  console.log(elementId);

  if (dataList.includes("is-numeric")) {
    if (!validateIsNumeric(element.value)) {
      isValid = false;
      element.classList.add("red-border");
    } else {
      element.classList.remove("red-border");
    }
  }

  if (dataList.includes("is-whole-number")) {
    if (!validateIsWholeNumber(element.value)) {
      isValid = false;
      element.classList.add("red-border");
      alert("The value is not a whole number.");
    } else {
      var elementValue = element.value;
      element.value = parseFloat(elementValue.toString());
      element.classList.remove("red-border");
    }
  }

  if (dataList.includes("is-positive-number")) {
    if (!validateIsPositiveNumber(element.value)) {
      isValid = false;
      element.classList.add("red-border");
    } else {
      element.classList.remove("red-border");
    }
  }

  if (dataList.includes("make-zero")) {
    if (!validateIsNumeric(element.value)) {
      element.value = 0;
    }
  }

  if (dataList.includes("less-than-face")) {
    var zFaceElement = document.getElementById("".concat(unit, "-zFace"));

    if (!validateIsNumeric(element.value)) {
      element.classList.add("red-border");
      alert("The value is not a number.");
      return false;
    }

    if (!validateZFace("".concat(unit, "-zFace"))) {
      zFaceElement.classList.add("red-border");
      alert("Z Face Invalid");
      return false;
    }

    if (element.value > zFaceElement.value) {
      element.classList.add("red-border");
      alert("The value is greater than the face value.");
      isValid = false;
    } else {
      element.classList.remove("red-border");
    }
  }

  if (dataList.includes("higher-than-face")) {
    var _zFaceElement = document.getElementById("".concat(unit, "-zFace"));

    if (!validateIsNumeric(element.value)) {
      element.classList.add("red-border");
      return false;
    }

    if (!validateZFace("".concat(unit, "-zFace"))) {
      _zFaceElement.classList.add("red-border");

      return false;
    }

    if (element.value < _zFaceElement.value) {
      isValid = false;
      alert("The value is less than the face value.");
      element.classList.add("red-border");
    } else {
      element.classList.remove("red-border");
    }
  }

  if (dataList.includes("is-percentage")) {
    if (!validateIsNumeric(element.value)) {
      element.classList.add("red-border");
      isValid = false;
    } else {
      if (element.value < 0.01 || element.value > 100) {
        element.classList.add("red-border");
        isValid = false;
      } else {
        element.classList.remove("red-border");
      }
    }
  }

  if (dataList.includes("make-negative")) {
    if (!validateIsNumeric(element.value)) {
      element.classList.add("red-border");
      alert("The value is not a number.");
      isValid = false;
    } else {
      if (element.value > 0) {
        element.value = (-1 * element.value).toString();
      }

      element.classList.remove("red-border");
    }
  }

  if (dataList.includes("is-not-empty")) {
    if (element.textContent === "" || element.textContent === null) {
      isValid = false;
      element.classList.add("red-border");
      alert("The value is empty.");
    } else {
      element.classList.remove("red-border");
    }
  } // add a trailing zero if element is not a whole number


  if (dataList.includes("trailing-zero")) {
    element.value = validateTrailingZero(element.value);
  }

  return isValid;
} // ORIGINAL FUNCTION FROM MAIN APP. DELETE WHEN DONE


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
}

function validateIsNumeric(value) {
  return numberRegex.test(value);
}

function validateIsWholeNumber(value) {
  return numberRegex.test(value) && Number.isInteger(parseFloat(value));
} // check to see if its a number, check to see if its a positive number


function validateIsPositiveNumber(value) {
  if (numberRegex.test(value)) {
    return value > 0;
  } else {
    return false;
  }
} // if value does not include a '.' add '.0' to the end


function validateTrailingZero(value) {
  if (!value.includes(".")) {
    var v = value + ".0";
    return v;
  } else {
    return value;
  }
}

function validateZFace(faceId) {
  var zFaceElement = document.getElementById(faceId);

  if (!zFaceElement) {
    console.log("zFaceElement does not exist");
    return false;
  }

  if (!zFaceElement.value) {
    return false;
  }

  return true;
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

function validatePositiveNumberFunction() {
  var input = getElementValue("validate-positive-number");

  if (!input) {
    resultsContainer.innerText = "input is null: ".concat(input);
    return;
  }

  var inputResults = validateIsPositiveNumber(input);
  resultsContainer.innerText = "input: ".concat(input, ", results: ").concat(inputResults);
}

function validateHigherThanFaceFunction() {
  var face = getElementValue("zFace");
  var input = getElementValue("validate-higher-than-face");

  if (!face) {
    resultsContainer.innerText = "face is null: ".concat(face);
    return;
  }

  if (!validateIsNumeric(face)) {
    resultsContainer.innerText = "face is not a number: ".concat(face);
    return;
  }

  if (!input) {
    resultsContainer.innerText = "input is null: ".concat(input);
    return;
  }

  if (!validateIsNumeric(input)) {
    resultsContainer.innerText = "input is not a number: ".concat(input);
    return;
  }

  var results = parseFloat(input) > parseFloat(face);
  resultsContainer.innerText = "face: ".concat(face, ", input: ").concat(input, ", results: ").concat(results);
}

function validateLessThanFace() {
  var face = getElementValue("zFace");
  var input = getElementValue("validate-less-than-face");

  if (!face) {
    resultsContainer.innerText = "face is null: ".concat(face);
    return;
  }

  if (!validateIsNumeric(face)) {
    resultsContainer.innerText = "face is not a number: ".concat(face);
    return;
  }

  if (!input) {
    resultsContainer.innerText = "input is null: ".concat(input);
    return;
  }

  if (!validateIsNumeric(input)) {
    resultsContainer.innerText = "input is not a number: ".concat(input);
    return;
  }

  var results = parseFloat(input) < parseFloat(face);
  resultsContainer.innerText = "face: ".concat(face, ", input: ").concat(input, ", results: ").concat(results);
}

function validateIsWholeNumberFunction() {
  var input = getElementValue("validate-is-whole-number");

  if (!input) {
    resultsContainer.innerText = "input is null: ".concat(input);
    return;
  }

  var inputResults = validateIsWholeNumber(input);
  var withoutTrailingZero = parseFloat(input.toString());
  resultsContainer.innerText = "input: ".concat(input, ", results: ").concat(withoutTrailingZero);
}