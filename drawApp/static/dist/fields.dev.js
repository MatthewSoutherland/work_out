"use strict";

var unitFields = {
  drill: {
    message: "drill-message",
    tool_number: "drill-tool-number",
    zFace: "drill-zFace",
    diameter: "drill-toolDiameter",
    peckDistance: "drill-peckDistance",
    depth: "drill-toolDepth",
    rpm: "drill-rpm",
    ipm: "drill-ipm",
    coolantAir: "drill-coolant-air"
  },
  chamfer: {
    message: "chamfer-message",
    tool_number: "chamfer-tool-number",
    zFace: "chamfer-zFace",
    diameter: "chamfer-toolDiameter",
    angle: "chamfer-angle",
    tipWidth: "chamfer-tip-width",
    edgeBreak: "chamfer-edge-break",
    rpm: "chamfer-rpm",
    ipm: "chamfer-ipm",
    coolantAir: "chamfer-coolant-air"
  },
  drilling: {
    featureData: {
      zFace: "drilling-zFace",
      holeDiameter: "drilling-holeDiameter",
      holeDepth: "drilling-holeDepth"
    }
  },
  taping: {
    featureData: {
      zFace: "taping-zFace",
      holeDiameter: "taping-holeDiameter",
      holeDepth: "taping-holeDepth",
      pitch: "taping-pitch"
    },
    tap: {
      message: "tap-message",
      tool_number: "tap-tool-number",
      zFace: "tap-zFace",
      diameter: "tap-major",
      pitch: "tap-pitch",
      depth: "tap-toolDepth",
      rpm: "tap-rpm",
      coolantAir: "tap-coolant-air"
    }
  },
  boring: {
    featureData: {
      zFace: "boring-zFace",
      holeDiameter: "boring-holeDiameter",
      holeDepth: "boring-holeDepth"
    },
    boringBar: {
      message: "boring-bar-message",
      tool_number: "boring-bar-tool-number",
      zFace: "boring-bar-zFace",
      diameter: "boring-bar-toolDiameter",
      depth: "boring-bar-toolDepth",
      rpm: "boring-bar-rpm",
      ipm: "boring-bar-ipm",
      coolantAir: "boring-bar-coolant-air"
    }
  },
  reaming: {
    featureData: {
      zFace: "reaming-zFace",
      holeDiameter: "reaming-holeDiameter",
      holeDepth: "reaming-holeDepth"
    },
    reamer: {
      message: "reaming-message",
      tool_number: "reaming-tool-number",
      zFace: "reaming-zFace",
      diameter: "reaming-toolDiameter",
      depth: "reaming-toolDepth",
      rpm: "reaming-rpm",
      ipm: "reaming-ipm",
      coolantAir: "reaming-coolant-air"
    }
  },
  "circle-mill": {
    featureData: {
      zFace: "circle-mill-zFace",
      holeDiameter: "circle-mill-holeDiameter",
      currentDiameter: "circle-mill-currentDiameter",
      holeDepth: "circle-mill-holeDepth"
    },
    rougher: {
      message: "rougher-message",
      tool_number: "rougher-tool-number",
      diameter: "rougher-toolDiameter",
      stockLeftR: "rougher-stock-left-r",
      stockLeftZ: "rougher-stock-left-z",
      depthCuts: "rougher-depth-cuts",
      widthCuts: "rougher-width-cuts",
      rpm: "rougher-rpm",
      ipm: "rougher-ipm",
      coolantAir: "rougher-coolant-air"
    },
    finisher: {
      message: "finisher-message",
      tool_number: "finisher-tool-number",
      diameter: "finisher-toolDiameter",
      depthCuts: "finisher-depth-cuts",
      rpm: "finisher-rpm",
      ipm: "finisher-ipm",
      coolantAir: "finisher-coolant-air"
    }
  },
  "tornado-mill": {
    featureData: {
      zFace: "tornado-mill-zFace",
      holeDiameter: "tornado-mill-holeDiameter",
      holeDepth: "tornado-mill-holeDepth"
    },
    rougher: {
      message: "rougher-message",
      tool_number: "rougher-tool-number",
      diameter: "rougher-toolDiameter",
      pitch: "rougher-pitch",
      rpm: "rougher-rpm",
      ipm: "rougher-ipm",
      coolantAir: "rougher-coolant-air"
    },
    finisher: {
      message: "finisher-message",
      tool_number: "finisher-tool-number",
      diameter: "finisher-toolDiameter",
      pitch: "finisher-pitch",
      rpm: "finisher-rpm",
      ipm: "finisher-ipm",
      coolantAir: "finisher-coolant-air"
    }
  },
  "face-top": {
    featureData: {
      zFace: "face-top-zFace",
      stock: "face-top-stock-z"
    },
    rougher: {
      message: "rougher-message",
      tool_number: "rougher-tool-number",
      diameter: "rougher-toolDiameter",
      stockLeftZ: "rougher-stock-left-z",
      depthCuts: "rougher-depth-cuts",
      noseRadius: "rougher-nose-radius",
      rpm: "rougher-rpm",
      ipm: "rougher-ipm",
      coolantAir: "rougher-coolant-air"
    },
    finisher: {
      message: "finisher-message",
      tool_number: "finisher-tool-number",
      diameter: "finisher-toolDiameter",
      rpm: "finisher-rpm",
      ipm: "finisher-ipm",
      coolantAir: "finisher-coolant-air"
    }
  },
  "line-left": {
    featureData: {
      depth: "line-left-depth",
      stockZ: "line-left-stock-z",
      stockR: "line-left-stock-r"
    },
    rougher: {
      message: "rougher-message",
      tool_number: "rougher-tool-number",
      diameter: "rougher-toolDiameter",
      stockLeftZ: "rougher-stock-left-z",
      stockLeftR: "rougher-stock-left-r",
      depthCuts: "rougher-depth-cuts",
      widthCuts: "rougher-width-cuts",
      rpm: "rougher-rpm",
      ipm: "rougher-ipm",
      coolantAir: "rougher-coolant-air"
    },
    finisher: {
      message: "finisher-message",
      tool_number: "finisher-tool-number",
      diameter: "finisher-toolDiameter",
      rpm: "finisher-rpm",
      ipm: "finisher-ipm",
      coolantAir: "finisher-coolant-air"
    }
  } // Add more features as necessary

};