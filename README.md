
# GraalVM vs. Node.js performance comparison

This is a set of minimal programs which, at the time of writing, perform faster on Node.js than they do on GraalVM Node.js

|Benchmark| What it does  |
|--|--|
| http-benchmark.js |  executes a GET request 100 times  |
| jsonpath-classic-benchmark.js | executes a set of 3 jsonpath queries 1000 times using Stefan Goessner's 2007 library|
| jsonpath-new-benchmark.js | executes a set of 3 jsonpath queries 1000 times using the popular jsonpath npm module| 
|regex-benchmark.js | executes the regex-redux problem 1000 times|

Here are the results from the author's computer: 

    $ ~/repos/graalvm-perf$ time node http-benchmark.js >> /dev/null
    
    real    0m6.833s
    user    0m0.250s
    sys     0m0.063s
    
    $ ~/repos/graalvm-perf$ time graalnode http-benchmark.js >> /dev/null
    
    real    0m7.236s
    user    0m1.094s
    sys     0m0.234s

    $ ~/repos/graalvm-perf$ time node jsonpath-classic-benchmark.js >> /dev/null
    
    real    0m0.120s
    user    0m0.125s
    sys     0m0.016s
    
    $ ~/repos/graalvm-perf$ time graalnode jsonpath-classic-benchmark.js >> /dev/null
    
    real    0m1.035s
    user    0m2.078s
    sys     0m0.203s

    $ ~/repos/graalvm-perf$ time node jsonpath-new-benchmark.js >> /dev/null
    
    real    0m0.176s
    user    0m0.234s
    sys     0m0.016s
    
    $ ~/repos/graalvm-perf$ time graalnode jsonpath-new-benchmark.js >> /dev/null
    
    real    0m1.961s
    user    0m4.219s
    sys     0m0.359s
    
    $ ~/repos/graalvm-perf$ time node regex-benchmark.js >> /dev/null
    
    real    0m0.303s
    user    0m0.281s
    sys     0m0.063s
    
    $ ~/repos/graalvm-perf$ time graalnode regex-benchmark.js >> /dev/null
    
    real    0m6.259s
    user    0m11.766s
    sys     0m0.438s
    
    $ neofetch
       OS: Ubuntu 20.04.1 LTS on Windows 10 x86_64
       Kernel: 4.4.0-19041-Microsoft    
       Shell: bash 5.0.17
       Terminal: /dev/tty1
       CPU: Intel i7-9700 (8) @ 3.000GHz
       Memory: 8113MiB / 12124MiB
    			
    $ node --version
    v14.8.0
    
    $ graalnode --version
    v12.15.0

graalnode is an alias for the GraalVM implementation of node.

