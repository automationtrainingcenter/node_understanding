import fs from "fs";
import http from "http";
import { fileURLToPath } from "url";
import path from "path";
import { URL } from "url";
import replaceTemplate from "./modules/replaceTemplate.js";

// Blocking, Synchronous way
// let fileIn = fs.readFileSync('./01-node-farm/txt/input.txt', 'utf-8');
// console.log(fileIn);
// let textOut = `This is what we know about the avocado: ${fileIn}Created on ${Date.now()}`;
// fs.writeFileSync('./01-node-farm/txt/output.txt', textOut);
// console.log('File data written');

// Non-blocking, Asynchronous way
// fs.readFile('./01-node-farm/txt/start.txt', (err, data1) => {
//     fs.readFile(`./01-node-farm/txt/${data1}.txt`, (err, data2) => {
//         fs.readFile('./01-node-farm/txt/append.txt', (err, data3) => {
//             fs.writeFile('./01-node-farm/txt/final.txt', `${data2}\n${data3}\n${Date.now()}`, err => {
//                 console.log("File Writing completed....");
//             })
//         })
//     })
// })

// console.log("this will print first");

// get the API data from data.json
let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
let data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
let dataObj = JSON.parse(data);
let tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, "utf-8");
let tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");
let tempCard = fs.readFileSync(`${__dirname}/templates/product-card.html`, "utf-8");

// Creating a server in nodejs
let server = http.createServer((req, res) => {
  let { search, pathname: pathName } = new URL(req.url, "http://localhost:8000");
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    let output = dataObj.map((product) => replaceTemplate(tempCard, product)).join("");
    output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, output);
    res.end(output);
  } else if (pathName === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    let output = replaceTemplate(tempProduct, dataObj[new URLSearchParams(search).get("id")]);
    res.end(output);
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "custom-header": "hello-world",
    });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listinging to requests on port 8000");
});
