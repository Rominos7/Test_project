import { requestData } from './requestData'

// mock for global fetch (this mock also not working properly. If be more specific - mockImplementation does not 'fire')
const mockJsonPromise = Promise.resolve('received data');
const mockFetchPromise = Promise.resolve({
    status: 200,
    json: () => mockJsonPromise,
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);


it('method GET',()=>{
    requestData('URL','GET');
    expect(global.fetch).toHaveBeenLastCalledWith('URL',{
        body:undefined,
        headers:{'Content-Type':'application/json'},
        method:'GET'
    });
});

it('method POST',()=>{
    requestData('URL','POST',{filed1:'data1'});
    expect(global.fetch).toHaveBeenLastCalledWith('URL',{
        body:JSON.stringify({filed1:'data1'}),
        headers:{'Content-Type':'application/json'},
        method:'POST'
    });;
});

it('method PUT',()=>{
    requestData('URL','PUT',{filed1:'data1'});
    expect(global.fetch).toHaveBeenLastCalledWith('URL',{
        body:JSON.stringify({filed1:'data1'}),
        headers:{'Content-Type':'application/json'},
        method:'PUT'
    });
});







