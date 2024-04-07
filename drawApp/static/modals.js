
function closeModal(elementId) {
    document.getElementById(elementId).style.display = "none";
}
  function drawLineModalFunction() {
    activeModal = "draw-line";
    dragElement();
    drawLineModal.style.display = "block";
  }

  function drawCircleModalFunction() {
    activeModal = "draw-circle";
    dragElement(document.getElementById(`${activeModal}-modal-content`));
    drawCircleModal.style.display = "block";
  }

  function drawRectangleModalFunction() {
    activeModal = "draw-rectangle";
    dragElement(document.getElementById(`${activeModal}-modal-content`));
    drawRectModal.style.display = "block";
  }

  function fillRectangleModalFunction() {
    activeModal = "fill-rectangle";
    dragElement(document.getElementById(`${activeModal}-modal-content`));
    fillRectModal.style.display = "block";
  }

  function drawArcModalFunction() {
    activeModal = "draw-arc";
    dragElement(document.getElementById(`${activeModal}-modal-content`));
    drawArcModal.style.display = "block";
  }

  function addTextModalFunction() {
    activeModal = "add-text";
    dragElement(document.getElementById(`${activeModal}-modal-content`));
    addTextModal.style.display = "block";
  }

  function saveJsonModalFunction() {
    activeModal = "save-json";
    dragElement(document.getElementById(`${activeModal}-modal-content`));
    saveJsonModal.style.display = "block";
  }

  function loadJsonModalFunction() {
    activeModal = "load-json";
    dragElement(document.getElementById(`${activeModal}-modal-content`));
    loadJsonModal.style.display = "block";
  }

  
  function showShapesModalFunction() {
    activeModal = "show-shapes";
    dragElement(document.getElementById(`${activeModal}-modal-content`));
    showShapesModal.style.display = "block";
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
    delete shapes[key];
    showShapesModal.style.display = "none";
    showShapesModalFunction();
  }

  function editShapeModalFunction(key) {
    // build a function to grab all the element values based on `${key}-${attr}`, and update the shapes object
    let shape = shapes[key];
    for (let attr in shape) {
      let element = document.getElementById(`${key}-${attr}`);
      shape[attr] = element.value;
    }
    showShapesModal.style.display = "none";
  }
