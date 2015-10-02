var http = require("http");
var fs = require('fs');

var writeStream = fs.createWriteStream("./output.txt");

//var kvs = {}; //dictionary or hashmap
function getFormValuesFromURL(url) {
    var kvs = {};
    var parts = url.split("?");
    var keyValuePairs = parts[1].split("&");

    for (var i = 0; i < keyValuePairs.length; i++) {
        var keyValue = keyValuePairs[i].split("=");
        kvs[keyValue[0]] = keyValue[1];
    }
    console.log(kvs);
    return kvs;
}

function serverFun(req, res) {
    
    console.log(req.url);
    try {
        var filePath = "./" + req.url;
        var f = fs.readFileSync(filePath);
        var contents = f.toString();
         res.writeHead(200);
        res.end(contents);

    } catch (exp) {
        if (req.url.indexOf("/firstForm") >= 0) {
            var form1 = getFormValuesFromURL(req.url);
             res.writeHead(200);
              writeStream.write(form1["mood"] + " " +  form1["howMany"] + "\n");
            res.end(form1["mood"] + form1["howMany"]);

        } else if (req.url.indexOf("/secondForm") >= 0) {
            var form2 = getFormValuesFromURL(req.url);
             res.writeHead(200);
             writeStream.write("Sex " + form2["sex"] + "\n" );
            res.end("Sex " + form2["sex"] );
        } else if (req.url.indexOf("/thirdForm") >= 0) {
            var form3 = getFormValuesFromURL(req.url);
             res.writeHead(200);
             writeStream.write("Computer " + form3["computer"] + "\n" );
            res.end("Computer Choice " + form3["computer"] );
        } else {
            console.error("Could not read", filePath);
             res.writeHead(404);
            res.end("error");
        }
    }

}
var server = http.createServer(serverFun);
server.listen(8080); //8080 is a port localhost

//ifconfig