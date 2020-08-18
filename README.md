
# GraalVM vs. Node.js performance comparison

This is a set of minimal programs which, at the time of writing, perform faster on Node.js than they do on GraalVM Node.js

|Benchmark| What it does  |
|--|--|
| http-benchmark.js |  executes a GET request 10000 times  |
| jsonpath-classic-benchmark.js | executes a set of 3 jsonpath queries 1000 times using Stefan Goessner's 2007 library|
| jsonpath-new-benchmark.js | executes a set of 3 jsonpath queries 1000 times using the popular jsonpath npm module| 
|regex-benchmark.js | executes the regex-redux problem 1000 times|

Here are the results from the author's computer: 

    $ ~/repos/graalvm-perf$ time node http-benchmark.js >> /dev/null
    
    real    0m2.943s
    user    0m1.656s
    sys     0m0.281s
    
    $ ~/repos/graalvm-perf$ time graalnode http-benchmark.js >> /dev/null
    
    real    0m19.619s
    user    0m40.594s
    sys     0m3.609s

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

Detailed results:

    $ time node http-benchmark.js 100 >> /dev/null

    real    0m0.105s
    user    0m0.031s
    sys     0m0.016s
    $ time graalnode http-benchmark.js 100 >> /dev/null

    real    0m0.566s
    user    0m0.578s
    sys     0m0.297s
    $ time graalnode --jvm http-benchmark.js 100 >> /dev/null

    real    0m3.337s
    user    0m12.109s
    sys     0m0.813s
    $ time node http-benchmark.js 1000 >> /dev/null

    real    0m0.472s
    user    0m0.266s
    sys     0m0.094s
    $ time graalnode http-benchmark.js 1000 >> /dev/null

    real    0m4.319s
    user    0m8.969s
    sys     0m0.516s
    $ time graalnode --jvm http-benchmark.js 1000 >> /dev/null

    real    0m6.852s
    user    0m23.391s
    sys     0m1.531s
    $ time node http-benchmark.js 10000 >> /dev/null

    real    0m3.096s
    user    0m1.438s
    sys     0m0.531s
    $ time graalnode http-benchmark.js 10000 >> /dev/null

    real    0m26.142s
    user    0m57.359s
    sys     0m3.281s
    $ time graalnode --jvm http-benchmark.js 10000 >> /dev/null

    real    0m20.474s
    user    1m2.875s
    sys     0m2.672s
    $ time node jsonpath-classic-benchmark.js 100 >> /dev/null

    real    0m0.054s
    user    0m0.031s
    sys     0m0.016s
    $ time graalnode jsonpath-classic-benchmark.js 100 >> /dev/null

    real    0m0.315s
    user    0m0.250s
    sys     0m0.203s
    $ time graalnode --jvm jsonpath-classic-benchmark.js 100 >> /dev/null

    real    0m2.807s
    user    0m9.406s
    sys     0m0.781s
    $ time node jsonpath-classic-benchmark.js 1000 >> /dev/null

    real    0m0.132s
    user    0m0.125s
    sys     0m0.000s
    $ time graalnode jsonpath-classic-benchmark.js 1000 >> /dev/null

    real    0m1.164s
    user    0m2.250s
    sys     0m0.313s
    $ time graalnode --jvm jsonpath-classic-benchmark.js 1000 >> /dev/null

    real    0m4.539s
    user    0m17.266s
    sys     0m1.016s
    $ time node jsonpath-classic-benchmark.js 10000 >> /dev/null

    real    0m0.413s
    user    0m0.391s
    sys     0m0.063s
    $ time graalnode jsonpath-classic-benchmark.js 10000 >> /dev/null

    real    0m5.513s
    user    0m12.359s
    sys     0m0.656s
    $ time graalnode --jvm jsonpath-classic-benchmark.js 10000 >> /dev/null

    real    0m7.122s
    user    0m25.625s
    sys     0m1.406s
    $ time node jsonpath-new-benchmark.js 100 >> /dev/null

    real    0m0.107s
    user    0m0.094s
    sys     0m0.031s
    $ time graalnode jsonpath-new-benchmark.js 100 >> /dev/null

    real    0m0.773s
    user    0m1.281s
    sys     0m0.328s
    $ time graalnode --jvm jsonpath-new-benchmark.js 100 >> /dev/null

    real    0m4.672s
    user    0m17.781s
    sys     0m1.031s
    $ time node jsonpath-new-benchmark.js 1000 >> /dev/null

    real    0m0.232s
    user    0m0.203s
    sys     0m0.063s
    $ time graalnode jsonpath-new-benchmark.js 1000 >> /dev/null

    real    0m2.718s
    user    0m6.141s
    sys     0m0.297s
    $ time graalnode --jvm jsonpath-new-benchmark.js 1000 >> /dev/null

    real    0m6.175s
    user    0m24.172s
    sys     0m1.547s
    $ time node jsonpath-new-benchmark.js 10000 >> /dev/null

    real    0m0.679s
    user    0m0.641s
    sys     0m0.078s
    $ time graalnode jsonpath-new-benchmark.js 10000 >> /dev/null

    real    0m6.336s
    user    0m15.031s
    sys     0m0.453s
    $ time graalnode --jvm jsonpath-new-benchmark.js 10000 >> /dev/null

    real    0m9.696s
    user    0m36.094s
    sys     0m1.500s
    $ time node regex-benchmark.js 100 >> /dev/null

    real    0m0.076s
    user    0m0.031s
    sys     0m0.047s
    $ time graalnode regex-benchmark.js 100 >> /dev/null

    real    0m1.125s
    user    0m1.219s
    sys     0m0.109s
    $ time graalnode --jvm regex-benchmark.js 100 >> /dev/null

    real    0m3.301s
    user    0m10.750s
    sys     0m0.906s
    $ time node regex-benchmark.js 1000 >> /dev/null

    real    0m0.332s
    user    0m0.344s
    sys     0m0.031s
    $ time graalnode regex-benchmark.js 1000 >> /dev/null

    real    0m6.728s
    user    0m13.000s
    sys     0m0.391s
    $ time graalnode --jvm regex-benchmark.js 1000 >> /dev/null

    real    0m5.777s
    user    0m18.641s
    sys     0m0.953s
    $ time node regex-benchmark.js 10000 >> /dev/null

    real    0m2.427s
    user    0m2.328s
    sys     0m0.141s
    $ time graalnode regex-benchmark.js 10000 >> /dev/null

    real    0m14.156s
    user    0m20.422s
    sys     0m0.859s
    $ time graalnode --jvm regex-benchmark.js 10000 >> /dev/null

    real    0m15.765s
    user    0m37.969s
    sys     0m1.688s

