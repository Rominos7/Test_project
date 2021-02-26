import React, { Fragment } from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import {store} from '../store/store'
import CardsField from '../components/cardsField/index'

let container:any = null;

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
  container = null;
});

it('testing Cards Field',()=>{
    act(() => {
        ReactDOM.render(
                <Provider store={store}>
                    <CardsField />   
                </Provider>,        
          container
        ); 
    });

    let addNewTaskButton = container.querySelector('div button');

    //pressing button to add task
    fireEvent.click(addNewTaskButton);
    expect(mockHistory).toHaveBeenCalledWith('/form');

})