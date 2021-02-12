import React,{Fragment,useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './addEditForm.module.scss'
import {requestData} from '../../servises/requestData'
import { useHistory, useLocation } from 'react-router-dom';
import {selectTaskNames} from '../../servises/store/reducers/taskListReducer'
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
        let idField = document.querySelector<HTMLInputElement>(`#${styles.idField}`);
        let status = document.querySelector<HTMLSelectElement>(`.${styles.statusSelect}`);
        let task = document.querySelector<HTMLInputElement>(`#${styles.taskField}`);
        let startDate = document.querySelector<HTMLInputElement>(`#${styles.startDateField}`);
        let finishDate = document.querySelector<HTMLInputElement>(`#${styles.finishDateField}`);
        
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
            endDate:finishDate?.value,
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
                <Link to='/'>To main page</Link>
                <section className={styles.upperSection}>
                    <div>
                        <label>ID of task</label>
                        {location.state===undefined?
                        <input placeholder ='enter id of task' id={styles.idField} type={'text'}></input>:
                        <input id={styles.idField} defaultValue={taskPlaceholder.id} type={'text'}></input>
                        }
                    </div>
                    <div className={styles.statusField}>
                        <div className={styles.statusIndicator}>
                            <label>Status</label>
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
                    <label>Task</label>
                    
                    {location.state===undefined?
                    <input placeholder='enter the name of the task' id={styles.taskField} type={'text'} ></input>:
                    <input id={styles.taskField} type={'text'} defaultValue={taskPlaceholder.task}></input>}

                </section>
                <section className={styles.lowerSection}>
                    <div>
                        <label>Start date</label>
                        <input type={'date'} id={styles.startDateField} defaultValue={taskPlaceholder.startDate}></input>
                    </div>
                    <div>
                        <label>Finish date</label>
                        <input type={'date'} id={styles.finishDateField} defaultValue={taskPlaceholder.endDate}></input>
                    </div>
                </section>
                {location.state===undefined?
                <button type='submit'>Add task</button>:
                <button type='submit'>Edit task</button>}               
            </form> 
        </>
    )
}

export default AddEditForm
