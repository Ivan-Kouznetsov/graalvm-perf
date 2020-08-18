const {request} = require('./lib/http_promise');
 
const main = async () => {
        for (let i=0;i<100;i++){
                await request("https://jsonplaceholder.typicode.com/todos/1", "get",{})
        }
}

main().then(()=>{console.log("done")}).catch(err=>console.error(err));
