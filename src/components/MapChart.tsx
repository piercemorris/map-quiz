import React, { useCallback, useEffect, useState } from "react";
import {
  ComposableMap,
  ZoomableGroup
} from "react-simple-maps";
import MapTest from "./MapTest";
import Button from "./Button";
import Input from "./Input";

export type GeographyType = {
  rsmKey: string,
  geometry: {
    coordinates: number[][][]
  },
  properties: {
    NAME_1: string,
    ID_1: string
  }
}

const MapChart = () => {
  const [geoList, setGeoList] = useState<GeographyType[]>()
  const [counter, setCounter] = useState<number>(0)
  const [answer, setAnswer] = useState<string>('');
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<GeographyType | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<[number, number]>([137.7276, 33]);

  const setList = (geographies: GeographyType[]) => {
    setGeoList(geographies)
  }

  const startQuiz = () => {
    setHasStarted(true);
    setRegion()
  }

  const nextQuestion = () => {
    if (answer === selectedRegion?.properties.NAME_1) {
      console.log('correct')
      setAnswer('')
      setRegion()
    } else {
      console.log('incorrect')
    }
  }

  const setRegion = useCallback(() => {
    if (geoList === undefined) return

    const region = geoList[counter];
    
    setCounter(prev => prev + 1);
    setSelectedRegion(region);
    console.log('selected region', region)
    setSelectedCoords(region.geometry.coordinates.flat(Infinity) as [number, number]);

  }, [counter, geoList])

  const updateMapCoords = useCallback((coords: any) => {
    console.log('coordinates updated', coords[0][0])
    setSelectedCoords(coords[0][0]);
  }, [])

  return (
    <div className="flex h-screen w-screen justify-center items-center flex-col gap-5">
      <ComposableMap
        className="rounded-lg w-5/12 h-3/6"
        projection='geoMercator'
        projectionConfig={{ center: [137.7276, 33], scale: 850 }}
      >
        <ZoomableGroup center={selectedCoords} zoom={5}>
          <MapTest selectedGeography={selectedRegion} setGeographies={setList} />
        </ZoomableGroup>
      </ComposableMap>
      <Input value={answer} onChange={(e) => setAnswer(e.target.value)} />
      {
        hasStarted ? (
          <Button text="Next" onClick={nextQuestion} />
        ) : (
          <button onClick={startQuiz}>
            Start Quiz
          </button>
        )
      }
    </div>
  );
};

export default MapChart