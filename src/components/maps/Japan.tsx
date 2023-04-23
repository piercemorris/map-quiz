//useSWR allows the use of SWR inside function components
import useSWR from 'swr';

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: string) => fetch(url).then((res) => res.json());

type JsonMapData = {
  name: string,
  country: string,
  regions: RegionType
}

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
  const { data, error } = useSWR('/api/staticdata', fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  return (
    <svg className="geolonia-svg-map" width="750" height="750" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <title>Japanese Prefectures</title>
      <p></p>
      <g className="svg-map" transform="matrix(1.028807, 0, 0, 1.028807, -47.544239, -28.806583)">
        <g transform="matrix(1, 0, 0, 1, 6, 18)">
          {data && JSON.parse(data).regions.map((region: RegionType) => 
            <g className='hover:fill-teal-500' key={region['title-en']} transform={region.svg.transform} strokeLinejoin='round' fill='#EEEEEE' fillRule='nonzero' stroke='#000000' strokeWidth='1.0'>
              {region.svg.polygons.length > 0 && region.svg.polygons.map((point, i) => <polygon key={i} points={point} />)}
              {region.svg.paths.length > 0 && region.svg.paths.map((point, i) => <path key={i} d={point} />)}
            </g>
          )}
        </g>
      </g>
    </svg>
  )
}

const Region = () => {
  return (
    <g></g>
  )
}

export default Japan