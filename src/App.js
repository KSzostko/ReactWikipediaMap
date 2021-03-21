import 'antd/dist/antd.css';
import GoogleMap from './components/map/GoogleMap';
import Nav from './components/Nav';
import MapMediator from './components/map/mediator';

function App() {
  return (
    <div>
      <MapMediator />
      <Nav />
      <GoogleMap />
    </div>
  );
}

export default App;
