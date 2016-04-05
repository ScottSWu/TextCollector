// Test
// var req = new XMLHttpRequest(); req.open("POST", "http://localhost:9000/", true); req.send(JSON.stringify({ name: "test", data: "Hello world!\n" }));

var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    
    if (req.method == "POST") {
        try {
            var post = "";
            req.on("data", function(chunk) {
                post += chunk.toString();
            });
            
            req.on("end", function() {
                var postobj = JSON.parse(post);
                var name = (postobj.name !== undefined) ? postobj.name.replace(/\./g, "") : "default.txt";
                var data = (postobj.data !== undefined) ? postobj.data : "";
                
                fs.appendFile("data/" + name, data, "utf8", function(e) {
                    if (e) {
                        res.writeHead(500);
                    }
                    else {
                        res.writeHead(200);
                    }
                });
            });
        }
        catch (e) {
            res.writeHead(404);
            console.log(e);
        }
    }
    else {
        res.writeHead(404);
        res.end();
    }
});

console.log("Listening...");
server.listen(9000);
