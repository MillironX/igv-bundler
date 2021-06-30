const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.use('/data', express.static(__dirname + '/data'));

app.get('/samples', function(req, res) {
    files = fs.readdirSync(path.join(__dirname + '/data'));
    contig_files = files.filter(file => file.endsWith('contigs.fasta'));
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(contig_files));
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('running listening on port ' + port)
})
