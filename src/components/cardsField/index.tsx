import React,{useState,useEffect} from 'react'
import styles from './cardsField.module.scss'
import TaskCard from '../taskCadr/index'
import {useSelector} from 'react-redux'
import {selectTaskList} from '../../store/reducers/taskListReducer'
import {useHistory} from 'react-router-dom'
import {useSetListData} from '../../services/useSetListData';


const CardsField:React.FC =()=>{

    const [task,setTaks] = useState([{
        id:'',
        startDate:'0',
        endDate:'1',
        task:'',
        status:'',
    },
    ]);

    const history = useHistory();

    useSetListData();
    
    const taskList = useSelector(selectTaskList);

    useEffect(()=>{
     return setTaks(taskList);
    })
    
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
            />
        )
    })

    return(
        <>
        <div className={styles.cardContainer}>
            <p className={styles.title}>Current tasks</p>
            <button className={styles.addButton} onClick={()=>{ history.push('/form')}}>Add new task</button>
            {showCards}         
        </div>
        </>
    )
}

export default CardsField;
