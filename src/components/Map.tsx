import React, { useEffect, useState } from "react"
import { Geography, useGeographies } from "react-simple-maps"
import { GeographyType } from "./MapChart"

interface Props {
  setMapCoords?: (coords: any) => void
  setGeographies: (geographies: GeographyType[]) => void
  selectedGeography: GeographyType | null
}

const Map: React.FC<Props> = ({ setGeographies, selectedGeography }) => {
  // TODO: not hardcode the link to map
  const { geographies } = useGeographies({ geography: "../japan.json" })
  const [map, setMap] = useState<any>()

  useEffect(() => {
    if (geographies.length === 0) return

    const isSelected = (geo: GeographyType) => {
      return geo.properties.ID_1 === selectedGeography?.properties.ID_1
    }

    setMap(
      geographies.map((geo: GeographyType) => (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          style={{
            default: {
              fill: isSelected(geo) ? "#DC143C" : "#D6D6DA",
              outline: "none",
            },
            // TODO: hover for a hint/fact associated with the region
            hover: {
              fill: "#DC143C",
              outline: "none",
            },
          }}
        />
      )),
    )

    setGeographies(geographies)
  }, [geographies, selectedGeography, setGeographies])

  return <g>{map}</g>
}

export default Map
