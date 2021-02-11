import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface taskList {
  id: number;
  startDate: number;
  endDate: number;
  task: string;
  status: string;
};

const initialState = [
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
];

export const taskSlice = createSlice({
    name: "taskSlice",
    initialState,
    reducers: {     
      setTaskList: (state, action: PayloadAction<taskList[]>) => {
        state.splice(0);
        action.payload.map((item,index:number)=>{
            return state[index]=item;
        })
      },
    },
  });
  
export const {setTaskList} = taskSlice.actions;
  
export const selectTaskList = (state: RootState) => state.taskList;
  
export default taskSlice.reducer;


