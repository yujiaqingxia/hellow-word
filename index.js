// console.log("hellow word!!!");
// var http=require("http");
// var url=require("url");

// http.createServer(function (request, response) {

// 	console.log("******************&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*******************");
// 	console.log(request.url);
// 	console.log(request.method);
// 	var pathname = url.parse(request.url).pathname;
// 	console.log(url.parse(request.url));
//     console.log("Request for " + pathname + " received.");
	
// 	console.log("*******************&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&******************");
// 	// console.log(response);
	
// 	// 发送 HTTP 头部 
// 	// HTTP 状态值: 200 : OK
// 	// 内容类型: text/plain
// 	response.writeHead(200, {'Content-Type': 'text/plain'});

// 	// 发送响应数据 "Hello World"
// 	response.end('Hello World\n123');
// }).listen(8888);

// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');

// let map0 = new Map()
//   .set(1, 'a')
//   .set(2, 'b')
//   .set(3, 'c');
//   console.log(map0);


var server = require("./server");
var router = require("./router");

server.start(router.route);
  