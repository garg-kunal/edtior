const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var fs = require('fs')
const port = 4000 || process.env.PORT

const app = express()
const {c, cpp, node, python, java} = require('compile-run');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('hello From WASD')
})

app.post('/cpp', (req, res) => {
  console.log(req.body.code)
  fs.appendFile('myfile.cpp', req.body.code, function (err) {
    if (err) throw err
    else{
        console.log('Saved!')
        cpp.runFile('./myfile.cpp', { stdin:'3\n2 '}, (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                console.log(result)
                res.send(result)
                 fs.unlinkSync('./myfile.cpp')
            }
        });
    }
  })
})


app.listen(port, () => {
  console.log('App Running at : ' + port)
})
