import { useEffect, useState } from 'react';
import JapanJson from '../../../public/json/japan.json';

type RegionType = {
  "title-en": string,
  "title-jp": string,
  svg: JsonSvg
}

type JsonSvg = {
  transform: string,
  paths: Array<string>,
  polygons: Array<string>
}

const Japan = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const selectRandomRegion = () => {
    const randomIndex = Math.floor(Math.random() * JapanJson.regions.length);
    setSelectedRegion(JapanJson.regions[randomIndex]['title-en']);
  }

  useEffect(() => {
    selectRandomRegion();
  }, [])

  return (
    <svg className="geolonia-svg-map" width="500" height="500" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <g className="svg-map" transform="matrix(1.028807, 0, 0, 1.028807, -47.544239, -28.806583)">
        <g transform="matrix(1, 0, 0, 1, 6, 18)">
          {JapanJson.regions.map((region: RegionType) =>
            <g key={region['title-en']} className={selectedRegion === region['title-en'] ? 'fill-teal-500' : ''} transform={region.svg.transform} strokeLinejoin='round' fill='#EEEEEE' fillRule='nonzero' stroke='#000000' strokeWidth='1.0'>
              {region.svg.polygons.length > 0 && region.svg.polygons.map((point, i) => <polygon key={i} points={point} />)}
              {region.svg.paths.length > 0 && region.svg.paths.map((point, i) => <path key={i} d={point} />)}
            </g>
          )}
        </g>
      </g>
    </svg>
  )
}

export default Japan