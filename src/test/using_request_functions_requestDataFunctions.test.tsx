//Disclaimer!
/*

This test is not finished because systen do not implement mock function for global fetch

*/

import { updateData, deleteCardData, addEditCardData} from '../services/requestDataFunctions'

// mock for global fetch (this mock also not working properly. If be more specific - mockImplementation does not 'fire')
const mockJsonPromise = Promise.resolve('received data');
const mockFetchPromise = Promise.resolve({
    status: 200,
    json: () => mockJsonPromise,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

it('using updateData function',async()=>{
    
    const request = /*await*/updateData();
    expect(global.fetch).toHaveBeenCalledWith('https://test-db-task-list-default-rtdb.firebaseio.com/taskList.json',{
        body:undefined,
        headers:{'Content-Type':'application/json'},
        method:'GET'
    })    
})

it('using addEditCardDate function',async()=>{
    const request = /*await*/addEditCardData('URL','method',{
        id:'id',
        startDate:'start date',
        endDate:'end date',
        task:'task',
        status:'status',
    });
    expect(global.fetch).toHaveBeenCalledWith('URL',{
        body:JSON.stringify({
            id:'id',
            startDate:'start date',
            endDate:'end date',
            task:'task',
            status:'status'
        }),
        headers:{'Content-Type':'application/json'},
        method:'method'
    })
  
})

it('using deleteCardData function',async()=>{
    const request = /*await*/deleteCardData('element');
    expect(global.fetch).toHaveBeenCalledWith('https://test-db-task-list-default-rtdb.firebaseio.com/taskList/element.json?x-http-method-override=DELETE',{
        body:undefined,
        headers:{'Content-Type':'application/json'},
        method:'DELETE'
    })
})
