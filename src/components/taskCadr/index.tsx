import React,{Fragment, useEffect,useState} from 'react'
import styles from './taskCard.module.scss'
import {requestData} from '../../servises/requestData'
import { useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux'
import {selectTaskNames,selectTaskList} from '../../servises/store/reducers/taskListReducer'
import {setTaskList,setListOfCodeNames} from '../../servises/store/reducers/taskListReducer'
import {useDispatch} from 'react-redux'

type Props ={
    id:number,
    numOfElement:number,
    startDate:number,
    endDate:number,
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
    
    //set up initiall color of indication
    //document.body.style.setProperty('--circleColor', `green`);
    
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
                <div>
                    <p>ID of taks</p>
                    {id}
                </div>
                <div className={styles.statusField}>
                    <div className={styles.statusIndicator}>
                        <p>Status</p>
                        <div className={styles.statusMark}></div>
                    </div>
                    <p className={styles.statusSelect}>{status}</p>
                </div>
            </section>
            <section className={styles.middleSection}>
                <div>
                    <p>Taks</p>
                    {task}
                </div>
            </section>
            <section className={styles.lowerSection}>
                <div>
                    <p>Start date</p>
                    {startDate}
                </div>
                <div>
                    <p>End date</p>
                    {endDate}
                </div>
            </section>
            <section>
                <button onClick={()=>{onDelete()}}>Delete task</button>
                <button onClick={()=>{onEdit()}} >Edit task</button>
            </section>
        </div>
        </>
    )
}

export default TaskCard;
