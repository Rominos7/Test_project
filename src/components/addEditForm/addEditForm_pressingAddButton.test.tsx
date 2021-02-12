import React, { Fragment } from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import AddEditForm from '.'
import {Provider} from 'react-redux'
import {store} from '../../servises/store/store'

let container:any = null;

//mock for history and location hooks
const mockHistory = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistory,
  }),
  useLocation: () => ({
  }),
}));

// mock for global fetch
const mockJsonPromise = Promise.resolve(['Successful']);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);


beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container); 
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


describe('ckeck if component is rendering succsesfully and we can Add taskCard',()=>{
  
  it("Render and pressing Add button", async () => {
    await act( async() => {
      ReactDOM.render(
              <Provider store={store}>
                    <AddEditForm/>
              </Provider>,        
        container
      );
    });
  
    let buttons = container.querySelectorAll('button');
    let toMainPage = buttons[0];
    let toAdd = buttons[1];
    
    //click on button to main page
    fireEvent.click(toMainPage);
    expect(mockHistory).toHaveBeenCalledWith('/');
    
    //click on button Add
    fireEvent.click(toAdd);
    //send request;
    expect(global.fetch).toHaveBeenCalledWith('https://test-db-task-list-default-rtdb.firebaseio.com/taskList.json',{
      body: JSON.stringify({ 
        id:'',
        startDate:'',
        endDate:'',
        task:'',
        status:'Active'
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    //after successful request redirect us to main screen
    expect(mockHistory).toHaveBeenCalledWith('/');
    
  });
});


/*
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistory,
  }),
  useLocation: () => ({
    state:{
      chosenTask:{
        id: '2',
            startDate: 3,
            endDate: 2,
            task: 'something',
            status: 'Solved',
      }
    }
  }),
}));


describe('ckeck if component is rendering succsesfully and we can Eddit taskCard',()=>{

  //mock for history and location hooks
const mockHistory = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistory,
  }),
  useLocation: () => ({
  state:{
      chosenTask:{
          id: '2',
          startDate: 3,
          endDate: 2,
          task: 'something',
          status: 'Solved',
      }
  },
}),
}));

  it("Edit taskCard", async () => {  
    await act( async() => {
      ReactDOM.render(
              <Provider store={store}>
                    <AddEditForm/>
              </Provider>,        
        container
      );
    });
  
    let buttons = container.querySelectorAll('button');
    let toMainPage = buttons[0];
    let toEdit = buttons[1];
    
    //click on button to main page
    fireEvent.click(toMainPage);
    expect(mockHistory).toHaveBeenCalledWith('/');
    
    //click on button Eddit
    fireEvent.click(toEdit);
    //send request;
    expect(global.fetch).toHaveBeenCalledWith('https://test-db-task-list-default-rtdb.firebaseio.com/taskList/undefinedjson?x-http-method-override=PUT',{
      body: JSON.stringify({ 
        id:'2',
        startDate:3,
        endDate:2,
        task:'something',
        status:'Active'
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    });
    //after successful request redirect us to main screen
    expect(mockHistory).toHaveBeenCalledWith('/');
  
  });
});
*/