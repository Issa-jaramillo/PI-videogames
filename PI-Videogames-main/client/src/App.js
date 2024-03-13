import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from './componentes/Landingpage/LandingPage';
import HomePage from './componentes/Homepage/Homepage';
import Detail from './componentes/Detailpage/Detail';
import Creategame from './componentes/Creategame/CreateGame'

import './App.css';
import CreateGame from "./componentes/Creategame/CreateGame";

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Router>

        <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/videogames/:id" component={Detail}></Route>
        <Route exact path="CreateGame" component={Creategame}></Route>
        <Route exact path=""></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
