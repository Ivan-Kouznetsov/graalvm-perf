const jsonpath = require('jsonpath');

const sampleObj = {name:"John",job:{title:"developer",payscale:3}};

for(let i=0;i<1000;i++){
	console.log(jsonpath.value(sampleObj,"$..name"));
	console.log(jsonpath.value(sampleObj,"$..payscale"));
	console.log(jsonpath.value(sampleObj,"$..age"));
}
