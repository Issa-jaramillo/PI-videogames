import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from '../src/componentes/Landingpage/LandingPage.jsx';
import Home from './componentes/Homepage/Home.jsx';
import Details from './componentes/Detailpage/Details.jsx';
import CreateGame from './componentes/Creategame/CreateGame.jsx';



const App = () => {
  return (
    <BrowserRouter> 
    <Routes>
  
          <Route  path="/" element={<LandingPage/>} />
          <Route  path="/home" element={<Home/>} />
          <Route  path="/videogames/:id" element={<Details/>} />
          <Route  path="/createGame" element={<CreateGame/>} />
     
    </Routes>
    </BrowserRouter>
  );
}

export default App;
