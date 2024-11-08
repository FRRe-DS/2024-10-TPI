"use client";
import "@google/model-viewer";

const Model = () => (
  <div id="card">
    <model-viewer

      src="modelos3D/este.obj.glb"

      ios-src=""
      // poster="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2Fposter-astronaut.png?v=1599079951717"
      alt="A 3D model of David"
      shadow-intensity="2"
      camera-controls
      auto-rotate
      ar
    ></model-viewer>
  </div>
);

export default Model;