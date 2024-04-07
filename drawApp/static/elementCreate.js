
  function createElement(tag, attributes = {}, text = "") {
    const element = document.createElement(tag);

    Object.keys(attributes).forEach(attr => {
      if (attributes[attr] !== null && attributes[attr] !== undefined) {
        element.setAttribute(attr, attributes[attr]);
      }
    });

    if (text) element.textContent = text;

    return element;
  }

  function getElementValue(elementId) {
    const element = document.getElementById(elementId);
    return element && element.value ? element.value : null;
  }

