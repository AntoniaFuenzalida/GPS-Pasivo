import React from "react";
import Map from "react-map-gl/maplibre";
import "mapbox-gl/dist/mapbox-gl.css";

const MapTest = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        initialViewState={{ longitude: -3.7038, latitude: 40.4168, zoom: 12 }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      />
    </div>
  );
};

export default MapTest;
