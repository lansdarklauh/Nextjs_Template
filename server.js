// 该文件是部署到IIS服务器上的入口文件，用于启动next.js项目
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    handle(req, res, parse(req.url, true));
  }).listen(process.env.PORT);
});
