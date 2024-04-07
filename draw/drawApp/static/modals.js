
  function drawLineModalFunction() {
    activeModal = "draw-line";
    dragElement(document.getElementById(`${activeModal}-modal-content`));
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

  function saveJson() {
    let fileName = getElementValue("save-json-filename");
    if (!fileName) {
      alert("Please enter a filename");
      return;
    }
    // Send shape data and file name to the server
    let payload = {
      fileName: fileName,
      json: shapes,
    };

    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload, null, 4),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    saveJsonModal.style.display = "none";
  }

  function loadJson() {
    let fileName = getElementValue("existing-files");
    if (!fileName) {
      alert("Please select a file");
      return;
    }
    fetch(`/load-json/${fileName}`, { method: "GET" }) // Change to 'GET' if you update the Flask route to accept 'GET'
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
        shapes = data;
        loadJsonModal.style.display = "none";
        updateShapesCounter();
      })
      .catch(error => {
        console.error("Error:", error);
      });
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

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(`${activeModal}-modal-header`)) {
      // if present, the header is where you move the DIV from:
      document.getElementById(`${activeModal}-modal-header`).onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
