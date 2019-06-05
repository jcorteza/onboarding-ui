const http = require("http");
const fs = require("fs");
const PORT = 9000;

const handleRequest = (request, response) => {
    fs.readFile("./src/index.html", "utf8", (err, page) => {
        if(err) throw err;
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.write(page, "utf8", () => {
            response.end();
        });
    });
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}/`);
});