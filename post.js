const http = require('http')
var querystring = require('querystring');
var fs = require('fs');

const server = http.createServer(function(request, response) {
    console.dir(request.param)
        // var d = getRspData('24');
        // console.log('D', d);

    if (request.method == 'POST') {
        console.log('POST')
        var body = ''
            // var d = 'Sucess ';

        request.on('data', function(data) {
            console.log('Post Param', data);
            body += data
            console.log('Partial body: ', body)
        })
        request.on('end', function() {
            var tmpstring = querystring.parse(body);
            var serviceID = (tmpstring.name) ? tmpstring.name : 'DYNAMIC';
            var data = getRspData(serviceID);
            var renderData = getData(data, serviceID);
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end(renderData);
        })
    } else {
        console.log('GET')
        var html = `
            <html>
                <body>
                    <form method="post" action="http://localhost:3000">
                        Name: 
                        <input type="text" name="name" />                       

                        <input type="submit" value="Submit" />
                    </form>
                </body>
            </html>`
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end(html)
    }
})

function getRspData(sid) {
    console.log('Servide ID', sid);
    var obj;
    var rspdata = '';
    return fs.readFileSync('input.json', 'utf8', function readFileCallback(err, data) {
        // console.log('Data', data);
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object

            for (i = 0; i < obj.table.length; i++) {
                console.log('obj.table[i].id', obj.table[i].id);
                console.log('sid', sid);
                if (obj.table[i].id === sid) {
                    rspdata = obj.table[i].square;
                }
            }
            json = JSON.stringify(obj); //convert it back to json
        }
        console.log('rspdata', rspdata);
        // return rspdata;
    });

}

function getData(data, sid) {
    console.log('Servide ID get data', sid);
    var obj = JSON.parse(data); //now it an object
    var rspdata = '';

    for (i = 0; i < obj.table.length; i++) {
        if (obj.table[i].id == sid) {
            rspdata = obj.table[i].square;
        }
    }
    return JSON.stringify(rspdata);
}
const port = 3000
const host = '127.0.0.1'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)