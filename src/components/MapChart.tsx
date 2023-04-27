import React from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";

const MapChart = () => {
  return (
    <div>
    <ComposableMap>
      <Geographies geography="/japan.json">
        {({ geographies }) =>
          geographies.map((geo) => {
            return <Geography key={geo.rsmKey} geography={geo} />;
          })
        }
      </Geographies>
    </ComposableMap>
  </div>
  );
};

export default MapChart;
