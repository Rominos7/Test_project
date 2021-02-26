import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import {store} from '../store/store'
import TaskCard from '../components/taskCadr/index'

let container:Element;

jest.clearAllMocks();

// mock for global fetch (this mock also not working properly. If be more specific - mockImplementation does not 'fire')
const mockJsonPromise = Promise.resolve(['Successful']);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);


const mockHistory = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistory,
  }),
}));


beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container); 
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  //container = null;
});

it('testing Task Card',()=>{
    act(() => {
        ReactDOM.render(
                <Provider store={store}>
                      <TaskCard
                        key={0}
                        numOfElement={0}
                        id={'qwerty123456'}
                        startDate={'2020-01-01'}
                        endDate={'2020-01-02'}
                        task={'To do something'}
                        status={'Active'}
                      />
                </Provider>,        
          container
        ); 
    });

    // getting access to fileds
    let sections = container.querySelectorAll('section');
    let upperSection = sections[0];
    let middleSection = sections[1];
    let lowerSection = sections[2];
    let buttonsSection = sections[3];

    let upperSectionDivs = upperSection.querySelectorAll('div');
    let middleSectionDivs = middleSection.querySelectorAll('div');
    let lowerSectionDivs = lowerSection.querySelectorAll('div');
    let buttons = buttonsSection.querySelectorAll('button');

    let idFields = upperSectionDivs[0].querySelectorAll('p');
    let statusField = upperSectionDivs[1].querySelectorAll('p');
    
    let taskName = middleSectionDivs[0].querySelectorAll('p');
    
    let startDateFields = lowerSectionDivs[0].querySelectorAll('p');
    let endDateFields = lowerSectionDivs[1].querySelectorAll('p');

    let deleteButton = buttons[1];
    let editButton = buttons[0];

    // checks
    expect(idFields[1].innerHTML).toMatch('qwerty123456');
    expect(statusField[1].innerHTML).toMatch('Active');
    expect(taskName[1].innerHTML).toMatch('To do something');
    expect(startDateFields[1].innerHTML).toMatch('2020-01-01');
    expect(endDateFields[1].innerHTML).toMatch('2020-01-02');

    //clicking on buttons
    fireEvent.click(editButton);
    expect(mockHistory).toHaveBeenCalledWith({
        pathname:'/form',
        state:{ 
            chosenTask:{ //this is data from initial state from redux(well, I am not so good at mocking useHistory hook :) )
                id:'1',
                startDate:'2',
                endDate:'3',
                task:'Have been done',
                status:'Solved',
            },
            chosenNunOfElement:0, 
        }
    });

    fireEvent.click(deleteButton);
    expect(global.fetch).toHaveBeenLastCalledWith('https://test-db-task-list-default-rtdb.firebaseio.com/taskList/Name1.json?x-http-method-override=DELETE',{
        body:undefined,
        headers:{'Content-Type':'application/json'},
        method:'DELETE'
    });

})

