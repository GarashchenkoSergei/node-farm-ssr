const fs = require('fs');
const http = require('http');

// Blocking, synchronous way
// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// const textOut = `This is what we know about the avocado: ${textIn} \nCreated at ${Date.now()}`;

// fs.writeFileSync('./starter/txt/output.txt', textOut);
// console.log('End');

// Non-blocking, asynchronous way
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
//   fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     fs.readFile('./starter/txt/append.txt', 'utf-8', (err, data3) => {
//       fs.writeFile('./starter/txt/output2.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('written')
//       });
//     });
//   });
// });

// console.log('reading');

//SERVER
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is OVERVIEW');
  } else if (pathName === '/product') {
    res.end('This is PRODUCT');
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'custom-header': 'hi-there'
    })
    res.end(`<h1>Page not found! ${res.statusCode}</h1>`)
  }
});

server.listen(8000, 'localhost', () => {
  console.log('Listening on 8000');
})