import React, { useEffect } from "react"
import { Geography, useGeographies } from "react-simple-maps"
import { GeographyType } from "./MapChart"

interface Props {
  // selectedCoords: any
  setMapCoords?: (coords: any) => void
  setGeographies: (geographies: GeographyType[]) => void
  selectedGeography: GeographyType | null
}

const MapTest: React.FC<Props> = ({ setGeographies, selectedGeography }) => {
  const { geographies } = useGeographies({ geography: "../japan.json" })

  useEffect(() => {
    if (geographies.length === 0) return

    setGeographies(geographies)
  }, [geographies, setGeographies])

  return (
    <g>
      {geographies.map((geo: GeographyType) => (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          strokeWidth="25"
          style={{
            default: {
              fill:
                geo.properties.ID_1 === selectedGeography?.properties.ID_1
                  ? "#f39800"
                  : "#D6D6DA",
              outline: "none",
            },
            hover: {
              outline: "none",
            },
            pressed: {
              outline: "none",
            },
          }}
        />
      ))}
      )
    </g>
  )
}

export default MapTest
