const jsonPath = require('./lib/jsonPath');
const internationsPerTest = process.argv[2] || 10000;
const testCount = process.argv[3] || 10;

const test=(iterations)=>{
    const sampleObj = {name:"john",job:{title:"developer", payscale:3}};
    let len = 0;

    for(let i=0;i<iterations;i++){
        len += jsonPath(sampleObj,"$..name").toString().length;
        len += jsonPath(sampleObj,"$..payscale").toString().length;
        len += jsonPath(sampleObj,"$..age").toString().length;
    }

    return len;
}

console.info(`Internations per test: ${internationsPerTest}`);
console.info(`Number of tests: ${testCount}`);

for(let i=0;i<testCount;i++){
    const start = Date.now();
    console.log("Output length: " + test(internationsPerTest));
    console.log(i+" = "+(Date.now()-start)+" ms");
}