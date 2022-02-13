const express = require('express')
const app = express()

const {spawn} = require('child_process');
const port = 3000

app.get('/', (req, res) => {
 
    var dataToSend;
    // spawn new child process to call the python script
    
    const python = spawn('python', ['halloo.py']);   // first parameter
    
    // # const python = spawn('python', ['script2.py','1','2']);   // 2  parameters in 1

    // collect data from script
    python.stdout.on('data', function (data) {
     console.log('Pipe data from python script ...');
     dataToSend = data.toString();  // convert the buffer data to a readable form use data.toString method
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`child process close stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend)
    });

    

    app.get('/tradingcountries', (req, res) => {
    var largeDataSet = [];
     // spawn new child process to call the python script
     const python = spawn('python', ['script3.py']);
     // collect data from script
     python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      largeDataSet.push(data);
     });
     // in close event we are sure that stream is from child process is closed
     python.on('close', (code) => {
     console.log(`child process close all stdio with code ${code}`);
     // send data to browser
     res.send(largeDataSet.join(""))
     });
     
    })
    
   })
   app.listen(port, () => console.log(`Example app listening on port ${port}!`))


