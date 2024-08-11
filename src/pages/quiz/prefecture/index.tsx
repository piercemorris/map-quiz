import React from "react"
import MapChart from "~/components/MapChart"

interface Props {
  name: string
}

const Prefecture: React.FC<Props> = ({ name }) => {
  return <MapChart />
}

export default Prefecture
