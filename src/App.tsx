import React,{Fragment} from 'react';
import styles from './app.module.scss'
import CardsField from '../src/components/cardsField/index'
import {useSetListData} from './servises/useSetListData'

const App:React.FC = () => {
  useSetListData();
  return (
    <>
      <CardsField/>
    </>
  );
}

export default App;
