
  function buildFeatureDataObject() {
    const featureInfo = unitFields[currentUnitVisability].featureData;
    const featureData = {};
    for (const key in featureInfo) {
      const fullId = `${featureInfo[key]}`;
      featureData[key] = document.getElementById(fullId).value;
    }
    return featureData;
  }

  function buildToolDataObject(toolType) {
    let tool;
    const toolData = {};

    if (toolType == "drill" || toolType == "chamfer") {
      tool = unitFields[toolType];
    } else {
      tool = unitFields[currentUnitVisability][toolType];
    }
    for (const key in tool) {
      const fullId = `${tool[key]}`;
      toolData[key] = document.getElementById(fullId).value;
    }
    return toolData;
  }

  function ifCheckedValidateToolFields(bool, toolType) {
    if (bool) {
      if (toolType == "drill" || toolType == "chamfer") {
        const toolIds = Object.values(unitFields[toolType]);
        toolIds.forEach(id => {
          if (!validateElementData(id)) {
            return false;
          }
        });
      } else {
        const toolIds = Object.values(unitFields[currentUnitVisability][toolType]);
        toolIds.forEach(id => {
          if (!validateElementData(id)) {
            return false;
          }
        });
      }
    }
    return true;
  }

  function submitDrillingData() {
    const featureDataIds = Object.values(unitFields[currentUnitVisability].featureData);

    featureDataIds.forEach(id => {
      const element = document.getElementById(id);
      const val = validateElementData(id);

      if (!val) {
        alert("Please fill out all required fields");
      }
    });

    if (!ifCheckedValidateToolFields(true, "drill")) {
      alert("tool shit returned false");
    }
  }
