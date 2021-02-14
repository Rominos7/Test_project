import React, { Fragment } from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import AddEditForm from '.'
import {Provider} from 'react-redux'
import {store} from '../../servises/store/store'

jest.clearAllMocks();

let container:any = null;
const mockHistory = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistory,
  }),
  useLocation: () => ({
    state:{
      chosenTask:{
        id: '2',
            startDate: '',
            endDate: '',
            task: 'something',
            status: 'Solved',
      }
    }
  }),
}));

// mock for global fetch (this mock also not working properly. If be more specific - mockImplementation does not 'fire')
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


describe('check if component is rendering succsesfully and we can Edit taskCard',()=>{
  
    it("Render and pressing Edit button", async () => {  
    await act( async() => {
      ReactDOM.render(
              <Provider store={store}>
                    <AddEditForm/>
              </Provider>,        
        container
      );
    });
  
    let buttons = container.querySelectorAll('button');
    let toMainPage = buttons[1];
    let toEdit = buttons[0];
    
    //click on button to main page
    fireEvent.click(toMainPage);
    expect(mockHistory).toHaveBeenCalledWith('/');
    
    //click on button Edit
    fireEvent.click(toEdit);
    //send request;
    expect(global.fetch).toHaveBeenCalledWith('https://test-db-task-list-default-rtdb.firebaseio.com/taskList/undefined.json?x-http-method-override=PUT',{
      body: JSON.stringify({ 
        id:'2',
        startDate:'',
        endDate:'',
        task:'something',
        status:'Solved'
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    });
    //after successful request redirect us to main screen
    expect(mockHistory).toHaveBeenCalledWith('/');
  
  });
});
