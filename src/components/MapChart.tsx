import React, { useCallback, useEffect, useState } from "react";
import {
  ComposableMap,
  ZoomableGroup
} from "react-simple-maps";
import MapTest from "./MapTest";

export type GeographyType = {
  rsmKey: string,
  geometry: {
    coordinates: number[][][]
  },
  properties: {
    ID_1: string
  }
}

const MapChart = () => {
  const [geoList, setGeoList] = useState<GeographyType[]>()
  const [counter, setCounter] = useState<number>(0)
  const [selectedRegion, setSelectedRegion] = useState<GeographyType | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<[number, number]>([137.7276, 33]);

  const setList = (geographies: GeographyType[]) => {
    setGeoList(geographies)
  }

  const startQuiz = () => {
    setRegion();
  }

  const setRegion = useCallback(() => {
    if (geoList === undefined) return

    const region = geoList[counter];
    
    setCounter(prev => prev + 1);
    setSelectedRegion(region);
    setSelectedCoords(region.geometry.coordinates.flat(Infinity) as [number, number]);

  }, [counter, geoList])

  const updateMapCoords = useCallback((coords: any) => {
    console.log('coordinates updated', coords[0][0])
    setSelectedCoords(coords[0][0]);
  }, [])

  return (
    <div className="flex h-screen w-screen justify-center items-center flex-col gap-5">
      <ComposableMap
        className="border-2 rounded-lg w-5/12 h-3/6"
        projection='geoMercator'
        projectionConfig={{ center: [137.7276, 33], scale: 850 }}
      >
        <ZoomableGroup center={selectedCoords} zoom={5}>
          <MapTest selectedGeography={selectedRegion} setGeographies={setList} />
        </ZoomableGroup>
      </ComposableMap>
      <button onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

const Button = ({}) => {
  return (
    <button>Click me</button>
  )
}

export default MapChart