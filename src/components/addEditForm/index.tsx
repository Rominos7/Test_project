import React,{Fragment,useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './addEditForm.module.scss'
import {requestData} from '../../services/requestData'
import { useHistory, useLocation } from 'react-router-dom';
import {selectTaskNames} from '../../store/reducers/taskListReducer'
import {useSelector} from 'react-redux'

const AddEditForm:React.FC =()=>{

    const history = useHistory();
    const location:any = useLocation();
    const listOfCodeNames = useSelector(selectTaskNames);


    const changeColor =()=>{
        let selectors = document.querySelector<HTMLSelectElement>(`.${styles.statusSelect}`);
        let circle:any = document.querySelector(`.${styles.statusMark}`);
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
 
    const sendNewTask=(event:any)=>{
        
        event.preventDefault();
        //collection data from form;
        let idField = document.querySelector<HTMLInputElement>(`#${styles.idField}`);
        let status = document.querySelector<HTMLSelectElement>(`.${styles.statusSelect}`);
        let task = document.querySelector<HTMLInputElement>(`#${styles.taskField}`);
        let startDate = document.querySelector<HTMLInputElement>(`#${styles.startDateField}`);
        let endDate = document.querySelector<HTMLInputElement>(`#${styles.endDateField}`);
        
        //validation check
        let startDateConverted = new Date((startDate?.value as string).toString());
        let endDateConverted = new Date((endDate?.value as string).toString());
        
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
            id:idField?.value,
            startDate:startDate?.value,
            endDate:endDate?.value,
            task:task?.value,
            status:status?.value,
        })
        .then((res:any)=>{
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

    useEffect(()=>{
        changeColor(); 
    },[])
    
    return(
        <>
            <form className={styles.mainEditField} onSubmit={sendNewTask} >
                <section className={styles.upperSection}>
                    <div className={styles.idSection}>
                        <label htmlFor={`${styles.idField}`}>ID of task</label>

                        {location.state===undefined?
                        <input placeholder ='endter task id' id={styles.idField} type={'text'}></input>:
                        <input id={styles.idField} defaultValue={taskPlaceholder.id} type={'text'}></input>
                        }

                    </div>
                    <div className={styles.statusField}>
                        <div className={styles.statusIndicator}>
                            <label htmlFor={`statusCheck`}>Status</label>
                            <div className={styles.statusMark}></div>
                        </div> 
                        <select name='statusCheck' defaultValue={taskPlaceholder.status} className={styles.statusSelect} onChange={()=>{changeColor()}}>
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

                        {location.state===undefined?
                        <input placeholder='enter task name' id={styles.taskField} type={'text'} ></input>:
                        <input id={styles.taskField} type={'text'} defaultValue={taskPlaceholder.task}></input>}
                    </div>
                </section>
                <section className={styles.lowerSection}>
                    <div className={styles.startDate}>
                        <label htmlFor={`${styles.startDateField}`}>Start date</label>
                        <input type={'date'} id={styles.startDateField} defaultValue={taskPlaceholder.startDate}></input>
                    </div>
                    <div className={styles.endDate}>
                        <label htmlFor={`${styles.endDateField}`}>End date</label>
                        <input type={'date'} id={styles.endDateField} defaultValue={taskPlaceholder.endDate}></input>
                    </div>
                </section>
                        
                {location.state===undefined?
                <button className={`${styles.button} ${styles.buttonAdd}`} type='submit'>Add task</button>:
                <button className={`${styles.button} ${styles.buttonEdit}`} type='submit'>Edit task</button>}

                <button className={styles.linkMainPage} onClick={(event:any)=>{event.preventDefault(); history.push('/');}}>To main page</button>               
            </form> 
        </>
    )
}

export default AddEditForm;
