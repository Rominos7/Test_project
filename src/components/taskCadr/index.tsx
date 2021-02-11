import React,{Fragment, useEffect} from 'react'
import styles from './taskCard.module.scss'

type Props ={
    id:number,
    numOfElement:number,
    startDate:number,
    endDate:number,
    task:string,
    status:string,
}


const TaskCard:React.FC<Props> =({id,numOfElement,startDate,endDate,task,status})=>{

    //set up initiall color of indication
    document.body.style.setProperty('--circleColor', `green`);
    
    const changeColor =()=>{
        let selectors:any = document.querySelectorAll(`.${styles.statusSelect}`);
        let circle:any = document.querySelectorAll(`.${styles.statusMark}`);
        if(selectors[numOfElement].value==='Active'){
            circle[numOfElement].style.backgroundColor = 'red';  
        }else if(selectors[numOfElement].value==='Pending'){
            circle[numOfElement].style.backgroundColor = 'yellow';
        }else if(selectors[numOfElement].value==='On hold'){
            circle[numOfElement].style.backgroundColor = 'orange';
        }else if(selectors[numOfElement].value==='Solved'){
            circle[numOfElement].style.backgroundColor = 'green';
        }

    }
    
    useEffect(()=>{
        changeColor(); 
    },[])
    
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
                    <select name='statusCheck' defaultValue={status} className={styles.statusSelect} onChange={()=>{changeColor()}}>
                        <option value='Active'>Active</option>
                        <option value='Pending'>Pending</option>
                        <option value='On hold'>On hold</option>
                        <option value='Solved'>Solved</option>
                    </select>
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
                <button>Delete task</button>
                <button>Edit task</button>
            </section>
        </div>
        </>
    )
}

export default TaskCard;
