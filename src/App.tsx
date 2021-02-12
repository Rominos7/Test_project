import React,{Fragment} from 'react';
import styles from './app.module.scss';
import CardsField from '../src/components/cardsField/index';
import AddEditForm from '../src/components/addEditForm'

//import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

const App:React.FC = () => {
  return (
    <>
    <Router >
      <Switch>
        <Route exact path='/'>
          <CardsField/>
        </Route>
        <Route path='/form'>
          <AddEditForm/>
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
