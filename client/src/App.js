import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPageComponent from "./components/landingPage/LandingPageComponent.jsx"
import HomeComponent from './components/home/HomeComponent.jsx';
import PostRecipeComponent from './components/postRecipe/PostRecipeComponent.jsx';
import DetailsComponent from './components/details/DetailsComponent.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage';

//BUSCAR BROWSER ROUTER

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPageComponent}/>
          <Route path="/home" component={HomeComponent} />
          <Route path="/create" component={PostRecipeComponent} />
          <Route path="/details/:id" component={DetailsComponent}/>
          <Route component={ErrorPage}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
