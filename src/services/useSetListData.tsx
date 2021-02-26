import React,{useEffect,useState} from 'react'
import {setTaskList,setListOfCodeNames} from '../store/reducers/taskListReducer'
import {useDispatch} from 'react-redux'
import {requestData} from './requestData'

export const useSetListData = ()=>{

    interface responce<T extends object>{
        statusCode:number,
        data:T,
    }

    const dispatch = useDispatch();

    useEffect(()=>{
        // here we will request our data
        const URL='https://test-db-task-list-default-rtdb.firebaseio.com/taskList.json';
        requestData(URL,'GET')
        .then((res:responce<object>)=>{
            dispatch(setTaskList(Object.values(res.data)));
            dispatch(setListOfCodeNames(Object.keys(res.data)));
        })
        .catch((err)=>{console.log(err)})     
    },[])
}
