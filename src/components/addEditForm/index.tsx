import React,{FormEvent, Fragment,useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './addEditForm.module.scss'
import {requestData} from '../../services/requestData'
import { useHistory, useLocation } from 'react-router-dom';
import {selectTaskNames} from '../../store/reducers/taskListReducer'
import {useSelector} from 'react-redux'
import { TargetElement } from '@testing-library/user-event';

const AddEditForm:React.FC =()=>{
 
    interface locationState{
           chosenTask:{
                id:string,
                startDate:string,
                endDate:string,
                task:string,
                status:string,
           },
           chosenNunOfElement:number, 
    }

    interface responce<T extends object>{
        statusCode:number,
        data:T,
    }

    const history = useHistory();
    const location = useLocation<locationState>();
    const listOfCodeNames = useSelector(selectTaskNames);


    const changeColor =()=>{
        let selectors = document.querySelector<HTMLSelectElement>(`.${styles.statusSelect}`);
        let circle = document.querySelector<HTMLDivElement>(`.${styles.statusMark}`) as HTMLDivElement;
        if(selectors?.value==='Active'){
            circle.style.backgroundColor = 'red';  
        }else if(selectors?.value==='Pending'){
            circle.style.backgroundColor = 'yellow';
        }else if(selectors?.value==='On hold'){
            circle.style.backgroundColor = 'orange';
        }else if(selectors?.value==='Solved'){
            circle.style.backgroundColor = 'green';
        }
    }
 
    const sendNewTask=(event:React.FormEvent)=>{
        
        event.preventDefault();
        //validation check
        let startDateConverted = new Date(startDate.toString());
        let endDateConverted = new Date(endDate.toString());
        
        let statDateTime = startDateConverted.getTime();
        let endDateTime = endDateConverted.getTime();

        if(statDateTime>endDateTime){
            return alert('Wrong data format! Start date could not be higher that End date');
        }
        
        // set up form for sending data to DB
        let URL='https://test-db-task-list-default-rtdb.firebaseio.com/taskList.json';
        let method = 'POST'

        if(location.state===undefined){
            URL='https://test-db-task-list-default-rtdb.firebaseio.com/taskList.json';
            method = 'POST';
        }else if(location.state!==undefined){
            const index = location.state.chosenNunOfElement;
            method = 'PUT';
            URL=`https://test-db-task-list-default-rtdb.firebaseio.com/taskList/${listOfCodeNames[index]}.json?x-http-method-override=PUT`;                           
        }

        requestData(URL,method,{
            id:idField,
            startDate:startDate,
            endDate:endDate,
            task:task,
            status:status,
        })
        .then((res:responce<object>)=>{
            history.push({
                pathname:'/',
            })
        })
        .catch((err)=>{console.log(err)})
    }

    let taskPlaceholder ={
        id:'',
        startDate:'',
        endDate:'',
        task:'',
        status:'Active',
    }
    if(location.state===undefined){
        
    }else if(location.state!==undefined){
        const {id,startDate,endDate,task,status} = location.state.chosenTask;        
        taskPlaceholder.id= id;
        taskPlaceholder.startDate= startDate;
        taskPlaceholder.endDate = endDate;
        taskPlaceholder.task = task;
        taskPlaceholder.status = status;            
    }

    const [idField,setIdField] = useState(taskPlaceholder.id);
    const [status,setStatus] = useState(taskPlaceholder.status);
    const [task,setTask] = useState(taskPlaceholder.task);
    const [startDate,setStartDate] = useState(taskPlaceholder.startDate);
    const [endDate,setEndDate] = useState(taskPlaceholder.endDate);
    
    const handleChangeInput=(event:React.FormEvent<HTMLInputElement>)=>{
        //event.preventDefault();
       switch(event.currentTarget.id){
           case styles.idField:{
                setIdField(event.currentTarget.value);
                break;    
           }
           case styles.taskField:{
                setTask(event.currentTarget.value);
                break;
           }
           case styles.startDateField:{
                setStartDate(event.currentTarget.value)
                break;
           }
           case styles.endDateField:{
                setEndDate(event.currentTarget.value)
                break;
           }
       }
    }

    const handleChangeSelect=(event:React.FormEvent<HTMLSelectElement>)=>{
        changeColor();
        setStatus(event.currentTarget.value);
    }
    
    useEffect(()=>{
        changeColor(); 
    },[])
    
    return(
        <>
            <form className={styles.mainEditField} onSubmit={sendNewTask} >
                <section className={styles.upperSection}>
                    <div className={styles.idSection}>
                        <label htmlFor={`${styles.idField}`}>ID of task</label>
                        <input placeholder ='endter task id' id={styles.idField} type={'text'} value={idField} onChange={handleChangeInput}></input>
                    </div>
                    <div className={styles.statusField}>
                        <div className={styles.statusIndicator}>
                            <label htmlFor={`statusCheck`}>Status</label>
                            <div className={styles.statusMark}></div>
                        </div> 
                        <select name='statusCheck' value={status} className={styles.statusSelect} onChange={handleChangeSelect}>
                                <option value='Active'>Active</option>
                                <option value='Pending'>Pending</option>
                                <option value='On hold'>On hold</option>
                                <option value='Solved'>Solved</option>
                        </select>
                    </div>
                </section>
                <section className={styles.middleSection}>
                    <div>
                        <label htmlFor={`${styles.taskField}`}>Task</label>
                        <input placeholder='enter task name' id={styles.taskField} type={'text'} value={task} onChange={handleChangeInput}></input>
                    </div>
                </section>
                <section className={styles.lowerSection}>
                    <div className={styles.startDate}>
                        <label htmlFor={`${styles.startDateField}`}>Start date</label>
                        <input type={'date'} id={styles.startDateField} value={startDate} onChange={handleChangeInput}></input>
                    </div>
                    <div className={styles.endDate}>
                        <label htmlFor={`${styles.endDateField}`}>End date</label>
                        <input type={'date'} id={styles.endDateField} value={endDate} onChange={handleChangeInput}></input>
                    </div>
                </section>
                        
                {location.state===undefined?
                <button className={`${styles.button} ${styles.buttonAdd}`} type='submit'>Add task</button>:
                <button className={`${styles.button} ${styles.buttonEdit}`} type='submit'>Edit task</button>}

                <button className={styles.linkMainPage} onClick={(event:React.FormEvent)=>{event.preventDefault(); history.push('/');}}>To main page</button>               
            </form> 
        </>
    )
}

export default AddEditForm;
