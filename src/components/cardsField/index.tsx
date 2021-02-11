import React,{Fragment,useState,useEffect} from 'react'
import styles from './cardsField.module.scss'
import TaskCard from '../taskCadr/index'
//import idGen from 'uuid';

const CardsField:React.FC =()=>{

    const [task,setTaks] = useState([{
        id:0,
        startDate:0,
        endDate:1,
        task:'',
        status:'',
    },
    ]);

    let taskList= [
            {id:1,
            startDate:2,
            endDate:3,
            task:'To do something',
            status:'Active',
            },
            {id:2,
            startDate:2,
            endDate:3,
            task:'To do something',
            status:'On hold',
            },      
        ];
    
    useEffect(()=>{
        setTaks(taskList);
    },[])

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
