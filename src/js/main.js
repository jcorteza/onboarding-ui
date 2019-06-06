const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 9000;

const handleRequest = (request, response) => {

    let filePath = `.${request.url}`;
    if(filePath == "./") {
        filePath = "index.html";
    }

    let extname = path.extname(filePath);
    const contentTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css"
    };
    
    if(extname in contentTypes) {
        
        let type = contentTypes[extname];

        fs.readFile(`./src/${filePath}`, "utf8", (err, content) => {

            if(err) throw err;

            response.writeHead(200, {'Content-Type': type})
            response.write(content, "utf8", () => {
                response.end();
            });
            
        });

    }

}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}/`);
});