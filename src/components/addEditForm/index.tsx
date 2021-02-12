import React,{Fragment,useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './addEditForm.module.scss'
import {requestData} from '../../servises/requestData'
import { useHistory } from 'react-router-dom';

const AddEditForm:React.FC =()=>{

    const changeColor =()=>{
        let selectors:any = document.querySelector(`.${styles.statusSelect}`);
        let circle:any = document.querySelector(`.${styles.statusMark}`);
        if(selectors.value==='Active'){
            circle.style.backgroundColor = 'red';  
        }else if(selectors.value==='Pending'){
            circle.style.backgroundColor = 'yellow';
        }else if(selectors.value==='On hold'){
            circle.style.backgroundColor = 'orange';
        }else if(selectors.value==='Solved'){
            circle.style.backgroundColor = 'green';
        }
    }

    const history = useHistory();
    
    useEffect(()=>{
        changeColor(); 
    },[])
    
    const sendNewTask=(event:any)=>{
        event.preventDefault();
        let idField = document.querySelector<HTMLInputElement>(`#${styles.idField}`);
        let status:any = document.querySelector(`.${styles.statusSelect}`);
        let task = document.querySelector<HTMLInputElement>(`#${styles.taskField}`);
        let startDate = document.querySelector<HTMLInputElement>(`#${styles.startDateField}`);
        let finishDate = document.querySelector<HTMLInputElement>(`#${styles.finishDateField}`);
        
        const URL='https://test-db-task-list-default-rtdb.firebaseio.com/taskList.json';
        requestData(URL,'POST',{
            id:idField?.value,
            startDate:startDate?.value,
            endDate:finishDate?.value,
            task:task?.value,
            status:status.value,
        })
        .then((res:any)=>{
            console.log(Object.values(res.data));
            console.log(Object.keys(res.data));
            history.push({
                pathname:'/',
            })
        })
        .catch((err)=>{console.log(err)})
        }

         

        
        //const URL='https://test-db-task-list-default-rtdb.firebaseio.com/taskList/-MTIBeABC9dJDJn8f9hQ.json?x-http-method-override=DELETE'
        //const URL='https://test-db-task-list-default-rtdb.firebaseio.com/taskList/-MTIBATadyulOB50lP4I.json?x-http-method-override=PUT';
        //const URL='https://test-db-task-list-default-rtdb.firebaseio.com/taskList.json';

    return(
        <>
            <form className={styles.mainEditField} onSubmit={sendNewTask} >
                <Link to='/'>To main page</Link>
                <section className={styles.upperSection}>
                    <div>
                        <label>ID of task</label>
                        <input placeholder ='enter id of task' id={styles.idField} type={'text'}></input>
                    </div>
                    <div className={styles.statusField}>
                        <div className={styles.statusIndicator}>
                            <label>Status</label>
                            <div className={styles.statusMark}></div>
                        </div> 
                        <select name='statusCheck' /*defaultValue={status}*/ className={styles.statusSelect} onChange={()=>{changeColor()}}>
                                <option value='Active'>Active</option>
                                <option value='Pending'>Pending</option>
                                <option value='On hold'>On hold</option>
                                <option value='Solved'>Solved</option>
                        </select>
                    </div>
                </section>
                <section className={styles.middleSection}>
                    <label>Task</label>
                    <input placeholder='enter the name of the task' id={styles.taskField} type={'text'}></input>
                </section>
                <section className={styles.lowerSection}>
                    <div>
                        <label>Start date</label>
                        <input placeholder='Enter date of the start' type={'date'} id={styles.startDateField}></input>
                    </div>
                    <div>
                        <label>Finish date</label>
                        <input placeholder='Enter date of the finish' type={'date'} id={styles.finishDateField}></input>
                    </div>
                </section>
                <button type='submit'>Add task</button>  
            </form> 
        </>
    )
}

export default AddEditForm
