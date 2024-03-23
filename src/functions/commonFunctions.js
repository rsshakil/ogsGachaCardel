
export const isNumeric = (value) => {
    const re = /^-?[0-9]\d*(\.\d+)?$/;
    return re.test(value);
}

export const headersParam = () =>{
    return {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': origin,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}