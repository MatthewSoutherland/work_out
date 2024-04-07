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