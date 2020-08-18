const jsonPath = require('./lib/jsonPath');

const sampleObj = {name:"john",job:{title:"developer", payscale:3}};

for(let i=0;i<1000;i++){
        console.log(jsonPath(sampleObj,"$..name"));
        console.log(jsonPath(sampleObj,"$..payscale"));
        console.log(jsonPath(sampleObj,"$..age"));
}
