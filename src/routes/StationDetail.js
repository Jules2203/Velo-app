import './StationDetail.css';
import Station from '../components/Station'
import {getStationById} from '../data/stations';
import { useParams } from "react-router-dom";

function StationDetail(props) {
  const params = useParams();
  const data = getStationById(params.stationId);

  return (
    <div className="StationDetail">
      <Station data={data}/>
    </div>
  );
}

export default StationDetail;
