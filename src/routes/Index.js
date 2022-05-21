import './Index.css';
import Hello from '../components/Hello'
import Counter from '../components/Counter'
import Search from '../components/Search.js'
import'../components/Search.css'
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
  const [lat, setLat] = useState(0);
  const [lng, setLon] = useState(0);

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

  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 14;

  useEffect(() => {
    console.log("yu")
    if (lat == 0) return
console.log("hi")
    if (map.current) return; // initialize map only once
    console.log("jatoch")
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/apetitpatat/cl2of35m5002j14o1vp749jo4',
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // only add markers when map is initialized
    if (markers.length) return; // only add markers once
    if (stations.length == 0) return
    if (lat == 0) return
    console.log(markers);
    const array = [];
    stations.forEach((station) => {
      const marker = {
        id: station.id,
        instance: new mapboxgl.Marker({color: "#9CA7FF"}).setLngLat([station.longitude, station.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${station.name}</h3><p>${"Beschikbare fietsen: " + station.free_bikes}</p>`
            ))
        .addTo(map.current)
      }
      array.push(marker);
    })
    
    const marker = {
      id: 'currentlocation',
      instance: new mapboxgl.Marker({ color: '#8E9AAF' })
        .setLngLat([lng, lat])
        .addTo(map.current),
    };
    
    array.push(marker);
    setMarkers(array);
    
  }, [stations, markers]);

  markers.forEach(marker => {
    if (filteredStations.find(station => station.id === marker.id)) {
      marker.instance.getElement().style.display = 'block';
    } else {
      marker.instance.getElement().style.display = 'none';
    }
    if (marker.id == 'currentlocation') {
      marker.instance.getElement().style.display = 'block';
    }
  })

  useEffect(() => {
    function success(pos) {
      console.log(pos.coords);
      setLon(pos.coords.longitude);
      setLat(pos.coords.latitude);
    }
    
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    var options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.watchPosition(success, error, options);
  });

  return (
    <div className="Index">
      <div className='balk'><Search search={search} setSearch={setSearch}/></div>
      <div ref={mapContainer} className="map-container"/>
      {search.length ? (
      <div className='stations'>{stations.length ? filteredStations.map((station)=>(
        <Link to={`/stations/${station.id}`} key={station.id}>{station.name} <br></br></Link>
      )) : (
        <div>LOADING...</div>
      )}
    </div>
      ): null}
    <div className='button'>
      <button className='Flyto'
                  onClick={() => {
                    map.current.flyTo({
                      center: [lng, lat],
                      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
                    });
                  }}
                  key={stations.id}
                > <img src={require("../images/location1.png")}/>
                  {stations.name}
                </button>
    </div></div>
    
       )};
export default Index;