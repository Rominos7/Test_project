import React,{Fragment,useState,useEffect} from 'react'
import styles from './cardsField.module.scss'
import TaskCard from '../taskCadr/index'
import {useSelector} from 'react-redux'
import {selectTaskList} from '../../servises/store/reducers/taskListReducer'
import {Link} from 'react-router-dom'
import {useSetListData} from '../../servises/useSetListData';

const CardsField:React.FC =()=>{

    const [task,setTaks] = useState([{
        id:'',
        startDate:0,
        endDate:1,
        task:'',
        status:'',
    },
    ]);
    const [update,setUpdate] = useState(false);

    useSetListData();
    const taskList = useSelector(selectTaskList); 
    
    useEffect(()=>{
        setTaks(taskList);
    })

    console.log(update);
    const showCards=task.map((item:any,index:number)=>{
        return(
            <TaskCard
               key={index}
               numOfElement={index}
               id={item.id}
               startDate={item.startDate}
               endDate={item.endDate}
               task={item.task}
               status={item.status}
               setUpdate={setUpdate} 
            />
        )
    })

    return(
        <>
        <div className={styles.cardContainer}>
            <p className={styles.title}>Current tasks</p>
            <Link to='/form'>Add new task</Link>
            {showCards}
        </div>
        </>
    )
}

export default CardsField;
