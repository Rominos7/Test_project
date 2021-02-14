import React,{Fragment, useEffect,useState} from 'react'
import styles from './taskCard.module.scss'
import {requestData} from '../../servises/requestData'
import { useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux'
import {selectTaskNames,selectTaskList} from '../../servises/store/reducers/taskListReducer'
import {setTaskList,setListOfCodeNames} from '../../servises/store/reducers/taskListReducer'
import {useDispatch} from 'react-redux'

type Props ={
    id:string,
    numOfElement:number,
    startDate:string,
    endDate:string,
    task:string,
    status:string,
}


const TaskCard:React.FC<Props> =({id,numOfElement,startDate,endDate,task,status})=>{

    const history = useHistory();
    const dispatch = useDispatch();
    
    const listOfCodeNames = useSelector(selectTaskNames);
    const taskList = useSelector(selectTaskList); 

    const updateData=()=>{
        let URL='https://test-db-task-list-default-rtdb.firebaseio.com/taskList.json';
            requestData(URL,'GET')
            .then((res:any)=>{
                dispatch(setTaskList(Object.values(res.data)));
                dispatch(setListOfCodeNames(Object.keys(res.data)));
            })
            .catch((err)=>{console.log(err)}) 
    }

    const onEdit = ()=>{
        history.push({
            pathname:'/form',
            state: {
                chosenTask:taskList[numOfElement],
                chosenNunOfElement:numOfElement,
            },
        })
    }

    const onDelete = () =>{
        let URL=`https://test-db-task-list-default-rtdb.firebaseio.com/taskList/${listOfCodeNames[numOfElement]}.json?x-http-method-override=DELETE`;
        requestData(URL,'DELETE')
        .then((res:any)=>{
            updateData(); 
        })      
        .catch((err)=>{console.log(err)})
    }
        
    const changeColor =()=>{
        let status = document.querySelectorAll<HTMLParagraphElement>(`.${styles.statusSelect}`);
        let circle = document.querySelectorAll<HTMLDivElement>(`.${styles.statusMark}`);
        if(status[numOfElement].innerHTML==='Active'){
            circle[numOfElement].style.backgroundColor = 'red';  
        }else if(status[numOfElement].innerHTML==='Pending'){
            circle[numOfElement].style.backgroundColor = 'yellow';
        }else if(status[numOfElement].innerHTML==='On hold'){
            circle[numOfElement].style.backgroundColor = 'orange';
        }else if(status[numOfElement].innerHTML==='Solved'){
            circle[numOfElement].style.backgroundColor = 'green';
        }
    }
    
    useEffect(()=>{ 
        changeColor();  
    })
    
    return(
        <>
        <div className={styles.cardBox}>
            <section className={styles.upperSection}>
                <div className = {styles.idField}>
                    <p>ID of task</p>
                    <p>{id}</p>
                </div>
                <div className={styles.statusField}>
                    <div className={styles.statusIndicator}>
                        <p className={styles.statusLabel}>Status</p>
                        <div className={styles.statusMark}></div>
                    </div>
                    <p className={styles.statusSelect}>{status}</p>
                </div>
            </section>
            <section className={styles.middleSection}>
                <div>
                    <p>Task</p>
                    <p>{task}</p>
                </div>
            </section>
            <section className={styles.lowerSection}>
                <div className={styles.startDate}>
                    <p>Start date</p>
                    <p>{startDate}</p>
                </div>
                <div className={styles.endDate}>
                    <p>End date</p>
                    <p>{endDate}</p>
                </div>
            </section>
            <section className = {styles.buttons}>
                <button className={styles.buttonsStyle} onClick={()=>{onDelete()}}>Delete task</button>
                <button className={styles.buttonsStyle} onClick={()=>{onEdit()}} >Edit task</button>
            </section>
        </div>
        </>
    )
}

export default TaskCard;
