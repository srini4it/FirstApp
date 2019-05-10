const http = require('http')
var querystring = require('querystring');
var fs = require('fs');
var isMobeix = true;

const server = http.createServer(function(request, response) {
    if (request.method == 'POST') {
        console.log('POST')
        var body = '';
        request.on('data', function(data) {
            console.log('Post Param', data);
            body += data
            console.log('Partial body: ', body)
        })
        request.on('end', function() {
            var ServiceID;
            if (isMobeix) {
                ServiceID = parseQuery(body);
                serviceID = ServiceID.mxsi;
                console.log('serviceID ', ServiceID.mxsi);
            } else {
                var tmpstring = querystring.parse(body);
                serviceID = tmpstring.name;
            }

            serviceID = (serviceID) ? serviceID : 'LG';
            var data = getRspData(serviceID);
            var renderData = getData(data, serviceID);
            // Website you wish to allow to connect
            response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            // Request headers you wish to allow
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            response.setHeader('Access-Control-Allow-Credentials', true);
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end(renderData);
        })
    } else {
        console.log('GET');

        var html = `
            <html>
                <body>
                    <form method="post" action="http://localhost:8080">
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

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

function getRspData(sid) {
    // writeData();
    console.log('Servide ID', sid);
    var obj;
    var rspdata = '';
    return fs.readFileSync('input.json', 'utf8', function readFileCallback(err, data) {

        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object

            for (i = 0; i < obj.Data.length; i++) {
                console.log('obj.Data[i].key', obj.Data[i].key);
                console.log('sid', sid);
                if (obj.Data[i].key === sid) {
                    rspdata = obj.Data[i].val;
                }
            }
            json = JSON.stringify(obj); //convert it back to json

        }
        console.log('rspdata', rspdata);

    });


}

function writeData() {

    console.log('Write Data ')
        //fs.appendFileSync
    fs.readFileSync('input.json', 'utf8', function readFileCallback(err, data) {
        console.log('data ', data)
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object

            // for (i = 0; i < obj.Data.length; i++) {
            //     console.log('obj.Data[i].key', obj.Data[i].key);
            //     console.log('sid', sid);
            //     if (obj.Data[i].key === sid) {
            //         rspdata = obj.Data[i].val;
            //     }
            // }
            var jn = JSON.stringify(obj); //convert it back to json
            jn.data.push({ key: srini, val: vasan });
            fs.writeFileSync('input.json', JSON.stringify(jn), { 'flags': 'a' }, function(err) {
                if (err) throw err;
                console.log('complete');
            });
        }
        console.log('rspdata', rspdata);

    });


}

function getData(data, sid) {
    console.log('Servide ID get data', sid);
    var obj = JSON.parse(data); //now it an object
    var rspdata = '';

    for (i = 0; i < obj.Data.length; i++) {
        if (obj.Data[i].key == sid) {
            rspdata = obj.Data[i].val;
        }
    }
    return JSON.stringify(rspdata);
}
const port = 8081
const host = '127.0.0.1'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)