import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface taskList {
  id: string;
  startDate: number;
  endDate: number;
  task: string;
  status: string;
};

interface FieldNames{
  names:string[];
}

const initialState ={
  listOfData:[
    {id:'1',
    startDate:2,
    endDate:3,
    task:'Have been done',
    status:'Active',
    },
    {id:'2',
    startDate:2,
    endDate:3,
    task:'To do something',
    status:'On hold',
    },  
  ],
  listOfCodeNames:['Name1','Name2'],
} 

export const taskSlice = createSlice({
    name: "taskSlice",
    initialState,
    reducers: {     
      setTaskList: (state, action: PayloadAction<taskList[]>) => {
        state.listOfData.splice(0);
        action.payload.map((item,index:number)=>{
            return state.listOfData[index]=item;
        })
      },
      setListOfCodeNames:(state, action: PayloadAction<string[]>) =>{
        state.listOfCodeNames.splice(0);
        action.payload.map((item,index:number)=>{
          return state.listOfCodeNames[index]=item;
      })
      },
    },
  });
  
export const {setTaskList,setListOfCodeNames} = taskSlice.actions;
  
export const selectTaskList = (state: RootState) => state.taskList.listOfData;
export const selectTaskNames = (state:RootState) => state.taskList.listOfCodeNames;
  
export default taskSlice.reducer;


