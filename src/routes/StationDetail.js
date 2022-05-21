import './StationDetail.css';
import Station from '../components/Station'
import {getStationById} from '../data/stations';
import { useParams } from "react-router-dom";
import {useRef, useEffect, useState} from 'react';
import {getStations as getStationsData, setStations as setStationsData} from '../data/stations';


function StationDetail(props) {
  const params = useParams();
  const data = getStationById(params.stationId);
    const [stations, setStations] = useState(getStationsData());
const [search, /*setSearch*/] = useState("");
    const [markers, /*setMarkers*/] = useState([]);  
    const [lat, /*setLat*/] = useState(0);
const [lng, /*setLon*/] = useState(0);
  
    const filteredStations = stations.filter((station) => station.name.toLowerCase().indexOf(search.toLowerCase()) >= 0)
  
    useEffect(() => {
      if (!stations.length) {
        async function getStations() {
          const response = await fetch('https://api.citybik.es/v2/networks/velo-antwerpen');
          const json = await response.json();
          setStations(json.network.stations);
          setStationsData(json.network.stations);
        }
  
        getStations()
      }
    }, [stations]);

  return (
    <div className="StationDetail">
      <Station data={data}/>
    </div>
  );
}

export default StationDetail;
