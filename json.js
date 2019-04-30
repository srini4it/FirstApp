var fs = require('fs');
/* Insert Data starts */
var data = {}
data.table = []
for (i = 0; i < 26; i++) {
    var obj = {
        id: i,
        square: i * i
    }
    data.table.push(obj)
}
// fs.writeFile("input.json", JSON.stringify(data), function(err) {
//     if (err) throw err;
//     console.log('complete');
// });
/* Insert Data Ends */

/* Read  Data starts */
fs.readFile('input.json', 'utf8', function readFileCallback(err, data) {
    console.log('Data', data);
    if (err) {
        console.log(err);
    } else {
        obj = JSON.parse(data); //now it an object

        for (i = 0; i < obj.table.length; i++) {
            console.log('Data found', i);
            console.log('OBJ Data ', obj.table[i].id);
            if (obj.table[i].id == '25') {
                console.log('Service ID ', obj.table[i].id);
                console.log('Resp Data ', obj.table[i].square);
                obj.table.push({ id: 2000, square: 3000 });
            }
        }

        json = JSON.stringify(obj); //convert it back to json
        console.log('Data after data push', json);
        // fs.writeFile('input.json', json, function(err) {
        //     if (err) throw err;
        // }); // write it back 
    }
});

/* Read  Data Ends */