//Esta es la app es sí misma
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './componentes/Landingpage/LandingPage.jsx';
import Home from './componentes/Homepage/Home.jsx';
import Details from './componentes/Detailpage/Details.jsx';
import CreateGame from './componentes/Creategame/CreateGame.jsx';
import EditVideoGame from './componentes/editGame/EditVideoGame.jsx';


const App = () => {
  return (
    <Router>
      <div style={{ textAlign: 'center' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/videogames/:id" component={Details} />
          <Route exact path="/createGame" component={CreateGame} />
          <Route exact path="/editVideoGame/:id" component={EditVideoGame} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
