import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'; //Bindings from redux and React
import { store } from './store/store.js';
import Start from './components/presentationals/start.jsx'
import Home from './components/presentationals/home.jsx'
import CountryDetail from './components/presentationals/countryDetail.jsx'
import ActivityPage from './components/presentationals/activityPage.jsx'
import './App.css';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Start} />
          <Route exact path='/countries' component={Home}/>
          <Route path='/newActivity' component={ActivityPage}/>
          <Route path='/countries/:id' component={CountryDetail}/>
        </Switch> 
      </BrowserRouter>
    </Provider>
  );
}

export default App;
