import {requestData} from './requestData'

interface addEdidtData{
    id:string,
    startDate:string,
    endDate:string,
    task:string,
    status:string,
}

export const updateData =  ()=>{   
    let URL='https://test-db-task-list-default-rtdb.firebaseio.com/taskList.json';
    const response = requestData(URL,'GET')
    return response;
}

export const deleteCardData = (nameOfElement:string) =>{   
    let URL=`https://test-db-task-list-default-rtdb.firebaseio.com/taskList/${nameOfElement}.json?x-http-method-override=DELETE`;
    const response = requestData(URL,'DELETE')
    return response;
}

export const addEditCardData = (URL:string,method:string,data:addEdidtData) =>{
    const {id,startDate,endDate,task,status} = data; 
    const response = requestData(URL,method,{
        id:id,
        startDate:startDate,
        endDate:endDate,
        task:task,
        status:status,
    })
    return response;
}
