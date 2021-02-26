import React from 'react';
import { Fragment } from 'react';
import { Provider } from "react-redux";
import { store } from "../store/store";
import {useSelector} from 'react-redux'
import {selectTaskList,selectTaskNames} from '../store/reducers/taskListReducer'
import {useSetListData} from '../services/useSetListData';
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";
import ReactDOM from "react-dom";

// mock for global fetch (this mock also not working properly. If be more specific - mockImplementation does not 'fire')
const mockJsonPromise = Promise.resolve(['Success_data']);
const mockFetchPromise = Promise.resolve({
  json:() => mockJsonPromise,
  status: 200,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

describe('useSetList Hook',()=>{
    const TestComponent:React.FC = ()=>{

        useSetListData();
        const state = useSelector(selectTaskList);
        const listOfCodeNames = useSelector(selectTaskNames);

        const data = Object.values(state);
        const data1 = Object.values(listOfCodeNames);

        return(
            <>
                <div>
                    Success!
                    <div>{data[0].status}</div>
                    <div>{data1[0]}</div>
                </div>
            </>
        )
    };


    let container:any= null;

    beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    });

    afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    });

    test('hook used successfuly', async () => {
        await act( async () => {
            ReactDOM.render(
                <Provider store={store}>
                    <TestComponent />
                </Provider>,
                container
                );
            });

        let divs = container.querySelectorAll('div');
        expect(divs[1].innerHTML).toBe('Solved');
        expect(divs[2].innerHTML).toBe('Name1');
        expect(global.fetch).toHaveBeenCalledTimes(1);
        
      });
})