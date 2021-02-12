
type response<T extends object>={
    statusCode:number;
    data:T;
}

export async function requestData<TData extends object>(
    url:string,
    method:string,
    body?:any
):Promise<response<TData>>{
    const res = await fetch(url,{
        method:method,
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(body),
    });

    const statusCode =res.status;
    const receivedBody = await res.json();

    return{
        statusCode,
        data:receivedBody as TData,
    };
}

