import './Index.css';
import Hello from '../components/Hello'
import Counter from '../components/Counter'
import Search from '../components/Search'
import {useRef, useEffect, useState} from 'react';
import {getStations as getStationsData, setStations as setStationsData} from '../data/stations';
import {Link} from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoidmF3LWJlIiwiYSI6ImNqeXUwM21ocDA4ejcza216ZWdlYWIzbWMifQ.cyZ_wwDAw_7GVvR0gVy8jQ';// 'YOUR_MAPBOX_ACCESS_TOKEN';

function Index() {
  const [stations, setStations] = useState(getStationsData());
  const [search, setSearch] = useState("");
  const [markers, setMarkers] = useState([]);

  const filteredStations = stations.filter((station) => station.name.toLowerCase().indexOf(search.toLowerCase()) >= 0)

  let names = ["Niels", "Lena", "Robbe", "Gitte"];

  let nameElements = [];
  names.forEach((name) => {
    nameElements.push(<Hello name={name} key={name}/>);
  })

  useEffect(() => {
    if (!stations.length) {
      async function getStations() {
        const response = await fetch('http://api.citybik.es/v2/networks/velo-antwerpen');
        const json = await response.json();
        setStations(json.network.stations);
        setStationsData(json.network.stations);
      }

      getStations()
    }
  }, [stations]);

  const mapContainer = useRef(null);
  const map = useRef(null);

  const lat = 51.212202;
  const lng = 4.427308;
  const zoom = 11;

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // only add markers when map is initialized
    if (markers.length) return; // only add markers once
    console.log(markers);
    const array = [];
    stations.forEach((station) => {
      const marker = {
        id: station.id,
        instance: new mapboxgl.Marker().setLngLat([station.longitude, station.latitude]).addTo(map.current)
      }
      array.push(marker);
    })
    setMarkers(array);
  }, [stations, markers]);

  markers.forEach(marker => {
    if (filteredStations.find(station => station.id === marker.id)) {
      marker.instance.getElement().style.display = 'block';
    } else {
      marker.instance.getElement().style.display = 'none';
    }
  })

  return (
    <div className="Index">
      {nameElements}
      <Counter/>
      <Search search={search} setSearch={setSearch}/>
      <div ref={mapContainer} className="map-container" />
      {stations.length ? filteredStations.map((station)=>(
        <Link to={`/stations/${station.id}`} key={station.id}>{station.name}</Link>
      )) : (
        <div>LOADING...</div>
      )}
    </div>
  );
}

export default Index;
