import React,{FormEvent, Fragment,useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './addEditForm.module.scss'
import {requestData} from '../../services/requestData'
import { useHistory, useLocation } from 'react-router-dom';
import {selectTaskNames} from '../../store/reducers/taskListReducer'
import {useSelector} from 'react-redux'
import { TargetElement } from '@testing-library/user-event';
import { readlink } from 'fs';
import { addEditCardData } from '../../services/requestDataFunctions'

const AddEditForm:React.FC =()=>{
    
    //set up interfaces
    interface locationState{
           chosenTask:{
                id:string,
                startDate:string,
                endDate:string,
                task:string,
                status:string,
           },
           chosenNumOfElement:number, 
    }

    //set up hooks
    const history = useHistory();
    const location = useLocation<locationState>();
    const listOfCodeNames = useSelector(selectTaskNames);

    //set up function for changing color for circle indicator
    const changeColor =()=>{
        let selectors = document.querySelector<HTMLSelectElement>(`.${styles.statusSelect}`);
        let circle = document.querySelector<HTMLDivElement>(`.${styles.statusMark}`) as HTMLDivElement;
        
        switch(selectors?.value){
            case('Active'):{
                circle.style.backgroundColor = 'red'; 
                break;
            }
            case('Pending'):{
                circle.style.backgroundColor = 'yellow';
                break;
            }
            case('On hold'):{
                circle.style.backgroundColor = 'orange';
                break;
            }
            case('Solved'):{
                circle.style.backgroundColor = 'green';
                break;
            }
        }
    }

    //set up placeholder(object) for form data
    let taskPlaceholder = {  
        id:'',
        startDate:'',
        endDate:'',
        task:'',
        status:'Active',
    }

    //look if we received some data from hook useHistory
    switch(location.state){
        case(undefined):{
            break;
        }
        default:{
            const {id,startDate,endDate,task,status} = location.state.chosenTask;        
            taskPlaceholder.id= id;
            taskPlaceholder.startDate= startDate;
            taskPlaceholder.endDate = endDate;
            taskPlaceholder.task = task;
            taskPlaceholder.status = status; 
            break;
        }
    }

    // set up hooks for setState
    const [idField,setIdField] = useState(taskPlaceholder.id);
    const [statusField,setStatusField] = useState(taskPlaceholder.status);
    const [taskField,setTaskField] = useState(taskPlaceholder.task);
    const [startDateField,setStartDateField] = useState(taskPlaceholder.startDate);
    const [endDateField,setEndDateField] = useState(taskPlaceholder.endDate);
    
    //set up handles for onChange event in form
    const handleChangeInput=(event:React.FormEvent<HTMLInputElement>)=>{
        //event.preventDefault();
       switch(event.currentTarget.id){
           case styles.idField:{
                setIdField(event.currentTarget.value);
                break;    
           }
           case styles.taskField:{
                setTaskField(event.currentTarget.value);
                break;
           }
           case styles.startDateField:{
                setStartDateField(event.currentTarget.value)
                break;
           }
           case styles.endDateField:{
                setEndDateField(event.currentTarget.value)
                break;
           }
       }
    }

    const handleChangeSelect=(event:React.FormEvent<HTMLSelectElement>)=>{
        changeColor();
        setStatusField(event.currentTarget.value);
    }
 
    //set up function for submiting form
    const submitForm = async(event:React.FormEvent)=>{  
        event.preventDefault();
        //validation check
        let startDateConverted = new Date(startDateField.toString());
        let endDateConverted = new Date(endDateField.toString());
        
        let statDateTime = startDateConverted.getTime();
        let endDateTime = endDateConverted.getTime();

        if(statDateTime>endDateTime){
            return alert('Wrong data format! Start date could not be higher that End date');
        }
        
        // set up form for sending data to DB
        let URL;
        let method;

        switch(location.state){  // depens if we received data from useHistory or not we chose method
            case(undefined):{
                URL='https://test-db-task-list-default-rtdb.firebaseio.com/taskList.json';
                method = 'POST';
                break;
            }
            default:{
                const index = location.state.chosenNumOfElement;
                method = 'PUT';
                URL=`https://test-db-task-list-default-rtdb.firebaseio.com/taskList/${listOfCodeNames[index]}.json?x-http-method-override=PUT`; 
            }
        }

        const requestAddEdit = await addEditCardData(URL,method,{
            id:idField,
            startDate:startDateField,
            endDate:endDateField,
            task:taskField,
            status:statusField,
        })

        if((requestAddEdit.statusCode===200)||(requestAddEdit.statusCode===201)){
            history.push('/'); //redirect to main page
        }
    }
    
    useEffect(()=>{
        changeColor(); 
    },[])
    
    return(
        <>
            <form className={styles.mainEditField} onSubmit={submitForm} >
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
                        <select name='statusCheck' value={statusField} className={styles.statusSelect} onChange={handleChangeSelect}>
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
                        <input placeholder='enter task name' id={styles.taskField} type={'text'} value={taskField} onChange={handleChangeInput}></input>
                    </div>
                </section>
                <section className={styles.lowerSection}>
                    <div className={styles.startDate}>
                        <label htmlFor={`${styles.startDateField}`}>Start date</label>
                        <input type={'date'} id={styles.startDateField} value={startDateField} onChange={handleChangeInput}></input>
                    </div>
                    <div className={styles.endDate}>
                        <label htmlFor={`${styles.endDateField}`}>End date</label>
                        <input type={'date'} id={styles.endDateField} value={endDateField} onChange={handleChangeInput}></input>
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
