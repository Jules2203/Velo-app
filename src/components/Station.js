import './Station.css';

function Station(props) {
  return (
    <div className="Station">
      {props.data.name}: {props.data.free_bikes}
    </div>
  );
}

export default Station;
