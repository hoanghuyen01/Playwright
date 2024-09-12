export class BaseService{
    async fetchAPI(url, method, headers, data){
        const res = await fetch(url, {
            method: method,
            headers: headers,
            body: data
          });
        return await res.json();
    }

}