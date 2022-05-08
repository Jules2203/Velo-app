import './Hello.css';

function Hello(props) {
  return (
    <div className="Hello">
      Hello {props.name}
    </div>
  );
}

export default Hello;
