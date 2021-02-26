import React, { Fragment } from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import {store} from '../store/store'
import App from '../App'

let container:any = null;


beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container); 
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('testing App.tsx (if it successfuly renders)',()=>{
    act(() => {
        ReactDOM.render(
                <Provider store={store}>
                    <App />   
                </Provider>,        
          container
        ); 
    });

})