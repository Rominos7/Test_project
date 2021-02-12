
type response<T extends object>={
    statusCode:number;
    data:T;
};

export async function requestData<TData extends object>(
    url:string,
    method:string,
    body?:any
):Promise<response<TData>>{
    const response = await fetch(url,{
        method:method,
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(body),
    });

    //if we do not receive any of data. Use this for mocking in tests(if mocking does not succsesfull)
    if(response!==null){
        console.log('resopnse received',response);
    }

    const statusCode = response.status;
    const receivedBody = await response.json();
    
    return{
        statusCode:statusCode,
        data:receivedBody as TData,
    };
}

