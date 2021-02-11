import React,{useEffect} from 'react'
import {setTaskList} from './store/reducers/taskListReducer'
import {useDispatch} from 'react-redux'

export const useSetListData = ()=>{
    const dispatch = useDispatch();

    useEffect(()=>{
        // here we will request our data
        const Data= [
            {id:1,
            startDate:2,
            endDate:3,
            task:'Have been done',
            status:'Active',
            },
            {id:2,
            startDate:2,
            endDate:3,
            task:'To do something',
            status:'On hold',
            },
            {id:3,
            startDate:2,
            endDate:3,
            task:'Getting done',
            status:'Solved',
            },   
        ];
        dispatch(setTaskList(Data));
    },[])
}