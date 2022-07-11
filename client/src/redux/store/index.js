import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; //NOS PERMITE CREAR ACTIONS CREATORS QUE DEVUELVAN UNA FUNCTION
//LO IMPORTANTE ES QUE ESTAS FUNCTIONS PUEDEN OPERAR DE MANERA ASINCRONA
import reducer from "../reducer"

//CREAR LA STORE
//BUSCAR QUE ES composeWithDevTools Y THUNK

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;