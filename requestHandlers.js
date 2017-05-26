var exec=require("child_process").exec;
var querystring=require("querystring"),
    fs=require("fs"),
    formidable=require("formidable");

function start(response) {
  console.log("Request handler 'start' was called.");
  var content = "empty123";


// 非阻塞，（不好的方式）
//   exec("ls -lah", function (error, stdout, stderr) {
//     content = stdout;
//   });

// 阻塞
// function sleep(milliSeconds) {
//     var startTime = new Date().getTime();
//     while (new Date().getTime() < startTime + milliSeconds);
//   }

//   sleep(10000);

//   return content;

//haode
// exec("node -v",
//     { timeout: 10000, maxBuffer: 20000*1024 },
//     function (error, stdout, stderr) {
//     if(error){
//         console.log(error);
//       }
//       console.log(stdout);
//       console.log(stderr);
//       response.writeHead(200, {"Content-Type": "text/plain"});
//       response.write(stdout);
//       response.end();
//     });


  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

    
}

function upload(response,request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    // form.uploadDir='tmp';
    console.log("about to parse");
    form.uploadDir="./tmp";
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        console.log(files);
        console.log(files.upload.name);
        console.log(files.upload.type);
        console.log(files.upload.path);
        fs.renameSync(files.upload.path, "./tmp/test.jpg");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("./tmp/test.jpg", "binary", function(error, file) {
        if(error) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(error + "\n");
        response.end();
        } else {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;