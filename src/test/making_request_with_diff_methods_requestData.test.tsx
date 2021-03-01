import { requestData } from '../services/requestData'

// mock for global fetch (this mock also not working properly. If be more specific - mockImplementation does not 'fire')
const mockJsonPromise = Promise.resolve('received data');
const mockFetchPromise = Promise.resolve({
    status: 200,
    json: () => mockJsonPromise,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);


it('using method GET, must be called with method GET',()=>{
    requestData('URL','GET');
    expect(global.fetch).toHaveBeenLastCalledWith('URL',{
        body:undefined,
        headers:{'Content-Type':'application/json'},
        method:'GET'
    });
});

it('using method POST, must be called with method POST',()=>{
    requestData('URL','POST',{filed1:'data1'});
    expect(global.fetch).toHaveBeenLastCalledWith('URL',{
        body:JSON.stringify({filed1:'data1'}),
        headers:{'Content-Type':'application/json'},
        method:'POST'
    });;
});

it('using method PUT, must be called with method PUT',()=>{
    requestData('URL','PUT',{filed1:'data1'});
    expect(global.fetch).toHaveBeenLastCalledWith('URL',{
        body:JSON.stringify({filed1:'data1'}),
        headers:{'Content-Type':'application/json'},
        method:'PUT'
    });
});







