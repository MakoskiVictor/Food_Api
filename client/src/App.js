import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPageComponent from "./components/landingPage/LandingPageComponent.jsx"
import HomeComponent from './components/home/HomeComponent';
import PostRecipeComponent from './components/postRecipe/PostRecipeComponent';

//BUSCAR BROWSER ROUTER

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPageComponent}/>
          <Route path="/home" component={HomeComponent} />
          <Route path="/create" component={PostRecipeComponent} />

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
