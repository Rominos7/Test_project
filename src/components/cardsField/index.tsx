import React,{Fragment} from 'react'
import styles from './cardsField.module.scss'
import TaskCard from '../taskCadr/index'

const CardsField:React.FC =()=>{
    return(
        <>
        <p>This is Cards Field</p>
        <TaskCard/>
        </>
    )
}

export default CardsField;
