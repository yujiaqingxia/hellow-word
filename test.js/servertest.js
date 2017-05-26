// var http=require("http");

// http.createServer(function (request, response) {

// 	// 发送 HTTP 头部 
// 	// HTTP 状态值: 200 : OK
// 	// 内容类型: text/plain
// 	response.writeHead(200, {'Content-Type': 'text/plain'});

// 	// 发送响应数据 "Hello World"
// 	response.end('Hello World\n');
// }).listen(8989);

// // 终端打印如下信息
// console.log(122);
// console.log('Server running at http://127.0.0.1:8989/');
var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
	var postData = "";
    var pathname = url.parse(request.url).pathname;

    // route(handle, pathname,response);

	request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });

  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;