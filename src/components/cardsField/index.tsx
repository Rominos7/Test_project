import React,{Fragment,useState,useEffect} from 'react'
import styles from './cardsField.module.scss'
import TaskCard from '../taskCadr/index'
import {useSelector} from 'react-redux'
import {selectTaskList} from '../../servises/store/reducers/taskListReducer'

const CardsField:React.FC =()=>{

    const [task,setTaks] = useState([{
        id:0,
        startDate:0,
        endDate:1,
        task:'',
        status:'',
    },
    ]);

    const taskList = useSelector(selectTaskList);
    
    useEffect(()=>{
        setTaks(taskList);
    },[task])

    const showCards=task.map((item:any,index:number)=>{
        return(
            <TaskCard
               key={item.id}
               numOfElement={index}
               id={item.id}
               startDate={item.startDate}
               endDate={item.endDate}
               task={item.task}
               status={item.status} 
            />
        )
    })

    return(
        <>
        <div className={styles.cardContainer}>
            <p className={styles.title}>Current tasks</p>
            <button>Add new task</button>
            {showCards}
        </div>
        </>
    )
}

export default CardsField;
