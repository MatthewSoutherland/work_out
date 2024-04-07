
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
    dragElement(elementId);
    document.getElementById(elementId).style.display = "block";
    const viewer = document.getElementById("show-shapes-viewer");
    viewer.innerHTML = "";  
  }
  
  function showShapes() {
    const viewer = document.getElementById("show-shapes-viewer");
    viewer.innerHTML = "";
    const shapeData = canvasMain.getShapeData();
    
    for (let i = 0; i < shapeData.length; i++) {
      let shape = shapeData[i];
      let filter = document.getElementById(`${shapeData[i].type}-filter`).checked;
      if (!filter) continue;
      let divCol = createElement("div", {
        class: "div-column border",
      });
      id = shape.id;
      for (let attr in shape) {
        let fontWeight = "normal";
        if (attr === "type") fontWeight = "bold";
        let div = createElement("div", {class: "div-row",});
        let label = createElement("label", {class: "label",}, `${attr}: `);
        let input = createElement("input", {
          class: "show-shapes-input",
          id: `${id}-${attr}`,
          "data-key": `${id}`,
          style: `font-weight: ${fontWeight}`,
          value: shape[attr],
        });
        div.appendChild(label);
        div.appendChild(input);
        divCol.appendChild(div);
      }
      let divRow = createElement("div", {class: "div-row",});
      let editButton = createElement("button", {
        class: "insert-button modal-button",
        onclick: `editShapeModalFunction(${id})`,
      }, "EDIT");
      let deleteButton = createElement("button", {
        class: "delete-button insert-button modal-button",
        onclick: `deleteShapeModalFunction(${id})`,
      }, "DELETE");
      divRow.appendChild(editButton);
      divRow.appendChild(deleteButton);
      divCol.appendChild(divRow);
      viewer.appendChild(divCol);
    }
  }

  function deleteShapeModalFunction(key) {
    canvasMain.deleteShape(key);
    showShapes();
  }

  function editShapeModalFunction(key) {
    // build a function to grab all the element values based on `${key}-${attr}`, and update the shapes object
    const shape = canvasMain.getShape(key);
    console.log(JSON.stringify(shape, null, 2));
    for (let attr in shape) {
      let element = document.getElementById(`${key}-${attr}`);
      if (element) {
        canvasMain.editShape(key, attr, element.value);
        console.log(`key: ${key} attr: ${attr} element.value: ${element.value}`);
      } else {
        console.warn(`Element not found for key: ${key}, attr: ${attr}`);
      }
      
    }
  }
  