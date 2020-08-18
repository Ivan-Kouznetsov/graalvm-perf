const {request} = require('./lib/http_promise');
 
const main = async () => {
        for (let i=0;i<10000;i++){
                await request("http://localhost:3000", "get",{})
        }
}

main().then(()=>{console.log("done")}).catch(err=>console.error(err));
