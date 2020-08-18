const jsonpath = require('jsonpath');
const n = process.argv[2] || 1000;

const sampleObj = {name:"John",job:{title:"developer",payscale:3}};

for(let i=0;i<n;i++){
	console.log(jsonpath.value(sampleObj,"$..name"));
	console.log(jsonpath.value(sampleObj,"$..payscale"));
	console.log(jsonpath.value(sampleObj,"$..age"));
}
