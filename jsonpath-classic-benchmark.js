const jsonPath = require('./lib/jsonPath');
const n = process.argv[2] || 1000;

const sampleObj = {name:"john",job:{title:"developer", payscale:3}};

for(let i=0;i<n;i++){
        console.log(jsonPath(sampleObj,"$..name"));
        console.log(jsonPath(sampleObj,"$..payscale"));
        console.log(jsonPath(sampleObj,"$..age"));
}
