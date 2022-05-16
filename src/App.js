import './App.css';
import {Link, Outlet} from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Outlet/>
      
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
  );
}

export default App;
