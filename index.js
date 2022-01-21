const fs = require('fs');
const http = require('http');
const url = require('url');

//SERVER
const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  } else {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'organic');
  }

  return output;
};

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const tepmOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const tepmCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
const tepmProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');

const server = http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(req.url, 'http://localhost:8000');

  // OVERVIEW
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });

    const cardsHtml = dataObj
      .map(el => replaceTemplate(tepmCard, el))
      .join('');
    const output = tepmOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);

  // PRODUCT
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    const product = dataObj.filter(el => el.id === Number(searchParams.get('id')))[0];
    const output = replaceTemplate(tepmProduct, product);

    res.end(output);

  //API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);

  //NOT FOUND
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