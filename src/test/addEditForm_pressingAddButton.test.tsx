import React, { Fragment } from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import AddEditForm from '../components/addEditForm'
import {Provider} from 'react-redux'
import {store} from '../store/store'

jest.clearAllMocks();

let container:Element;

//mock for history and location hooks
const mockHistory = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistory,
  }),
  useLocation: () => ({
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
});


describe('check if component is rendering succsesfully and we can Add taskCard',()=>{
  
  it("Rendering component and pressing Add button, expecting to call fetch with POST method", async () => {
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
    let toAdd = buttons[0];
    
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

