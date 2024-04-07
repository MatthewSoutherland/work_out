
function closeModal(elementId) {
    document.getElementById(elementId).style.display = "none";
}
  function drawLineModalFunction() {
    const elementId = "draw-line-modal";
    activeModal = "draw-line";
    dragElement(elementId);
    document.getElementById(elementId).style.display = "block";
  }

  function drawCircleModalFunction() {
    const elementId = "draw-circle-modal";
    activeModal = "draw-circle";
    dragElement(elementId);
    document.getElementById(elementId).style.display = "block";
  }

  function drawRectangleModalFunction() {
    const elementId = "draw-rectangle-modal";
    activeModal = "draw-rectangle";
    dragElement(elementId);
    document.getElementById(elementId).style.display = "block";
  }

  function drawArcModalFunction() {
    const elementId = "draw-arc-modal";
    activeModal = "draw-arc";
    dragElement(elementId);
    document.getElementById(elementId).style.display = "block";
  }

  function addTextModalFunction() {
    const elementId = "add-text-modal";
    activeModal = "add-text";
    dragElement(elementId);
    document.getElementById(elementId).style.display = "block";
  }

  function saveJsonModalFunction() {
    const elementId = "save-json-modal";
    activeModal = "save-json";
    dragElement(elementId);
    document.getElementById(elementId).style.display = "block";
  }

  function loadJsonModalFunction() {
    const elementId = "load-json-modal";
    activeModal = "load-json";
    dragElement(elementId);
    document.getElementById(elementId).style.display = "block";
  }

  
  function showShapesModalFunction() {
    const elementId = "show-shapes-modal";
    activeModal = "show-shapes";
    dragElement(elementId);
    document.getElementById(elementId).style.display = "block";
    const viewer = document.getElementById("show-shapes-viewer");
    viewer.innerHTML = "";

    for (let key in shapes) {
      let shape = shapes[key];
      let divCol = createElement("div", {
        class: "div-column border",
      });

      for (let attr in shape) {
        let fontWeight = "normal";
        if (attr === "type") {
          fontWeight = "bold";
        }
        let div = createElement("div", {
          class: "div-row",
        });

        let label = createElement(
          "label",
          {
            class: "label",
          },
          `${attr}: `
        );

        let input = createElement("input", {
          class: "show-shapes-input",
          id: `${key}-${attr}`,
          style: `font-weight: ${fontWeight}`,
          value: shape[attr],
        });

        div.appendChild(label);
        div.appendChild(input);
        divCol.appendChild(div);
      }
      let divRow = createElement("div", {
        class: "div-row",
      });

      let editButton = createElement(
        "button",
        {
          class: "insert-button modal-button",
          onclick: `editShapeModalFunction("${key}")`,
        },
        "EDIT"
      );

      let deleteButton = createElement(
        "button",
        {
          class: "delete-button insert-button modal-button",
          onclick: `deleteShapeModalFunction("${key}")`,
        },
        "DELETE"
      );

      divRow.appendChild(editButton);
      divRow.appendChild(deleteButton);
      divCol.appendChild(divRow);
      viewer.appendChild(divCol);
    }
  }

  function deleteShapeModalFunction(key) {
    const elementId = "delete-shape-modal";
    delete shapes[key];
    document.getElementById("show-shapes-modal").style.display = "none";
    showShapesModalFunction();
  }

  function editShapeModalFunction(key) {
    // build a function to grab all the element values based on `${key}-${attr}`, and update the shapes object
    let shape = shapes[key];
    for (let attr in shape) {
      let element = document.getElementById(`${key}-${attr}`);
      shape[attr] = element.value;
    }
    document.getElementById("show-shapes-modal").style.display = "none";
  }
