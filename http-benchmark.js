const {request} = require('./lib/http_promise');

const n = process.argv[2] || 10000;

const main = async () => {
    for (let i=0;i<n;i++){
        await request("http://localhost:3000", "get",{})
    }
}

main().then(()=>{console.log("done")}).catch(err=>console.error(err));
