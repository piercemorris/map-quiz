import React, { useCallback, useState } from "react"
import { ComposableMap, ZoomableGroup } from "react-simple-maps"
import MapTest from "./MapTest"
import Button from "./Button"
import Input from "./Input"

import prefectures from "~/models/prefectures"

export type GeographyType = {
  rsmKey: string
  geometry: {
    coordinates: number[][][]
  }
  properties: {
    NAME_1: string
    ID_1: string
  }
}

const isAnswerCorrect = (answer: string, prefecture: string): boolean =>
  [
    prefecture.toLowerCase(),
    prefectures[prefecture].hiragana,
    prefectures[prefecture].kanji,
  ].includes(answer)

const MapChart = () => {
  const [geoList, setGeoList] = useState<GeographyType[]>()
  const [counter, setCounter] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [answer, setAnswer] = useState<string>("")
  const [hasStarted, setHasStarted] = useState<boolean>(false)
  const [selectedRegion, setSelectedRegion] = useState<GeographyType | null>(
    null,
  )
  const [selectedCoords, setSelectedCoords] = useState<[number, number]>([
    137.7276, 33,
  ])

  const setList = (geographies: GeographyType[]) => {
    setGeoList(geographies)
  }

  const startQuiz = () => {
    setHasStarted(true)
    setRegion()
  }

  const nextQuestion = () => {
    if (
      isAnswerCorrect(answer.toLowerCase(), selectedRegion?.properties.NAME_1!)
    ) {
      setScore((prev) => prev + 1)
    }

    setAnswer("")
    setRegion()
  }

  const setRegion = useCallback(() => {
    if (geoList === undefined) return

    const region = geoList[counter]

    setCounter((prev) => prev + 1)
    setSelectedRegion(region)
    console.log("selected region:", region.properties.NAME_1)
    setSelectedCoords(
      region.geometry.coordinates.flat(Infinity) as [number, number],
    )
  }, [counter, geoList])

  const updateMapCoords = useCallback((coords: any) => {
    console.log("coordinates updated", coords[0][0])
    setSelectedCoords(coords[0][0])
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <ComposableMap
        className="h-3/6 w-5/12 rounded-lg"
        projection="geoMercator"
        projectionConfig={{ center: [137.7276, 33], scale: 850 }}
      >
        <ZoomableGroup center={selectedCoords} zoom={5}>
          <MapTest
            selectedGeography={selectedRegion}
            setGeographies={setList}
          />
        </ZoomableGroup>
      </ComposableMap>
      {hasStarted ? (
        <>
          <Input value={answer} onChange={(e) => setAnswer(e.target.value)} />
          <Button text="Next" onClick={nextQuestion} />
          <span>
            score: {score}/{counter - 1}
          </span>
        </>
      ) : (
        <button onClick={startQuiz}>Start Quiz</button>
      )}
    </div>
  )
}

export default MapChart
