const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require("cors");
const path = require('path');
const settings = require('./settings');

const app = express();

const DIR = settings.mediaPath

app.use(cors());

app.get('/api/videos', function(req, res) {
    const files = fs.readdirSync(DIR);
    res.json(files);
});

app.get('/api/video', function(req, res) {
    const fileName = req.query.v;
    if (!fileName) {
        res.status(400).send('No video provided.');
        return;
    }
    const filePath = `${DIR}${path.sep}${fileName}`;
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize) {
            res.status(416).send(`Requested range not satisefiable. \n ${start} >= ${fileSize}`);
            return;
        }

        const chunkSize = (end - start) + 1;
        const file = fs.createReadStream(filePath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': `video/${fileName.split('.').pop()}`,
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': `video/${fileName.split('.').pop()}`,
        }
        res.writeHead(200, head)
        fs.createReadStream(filePath).pipe(res)
    }
});

if (process.env.NODE_ENV === "development") {
    app.listen(settings.httpPort, function() {
        console.log(`HTTP listening on port ${settings.httpPort}`);
    });
}

https.createServer({
    key: fs.readFileSync(settings.keyPath),
    cert: fs.readFileSync(settings.certPath)
}, app).listen(settings.httpsPort, function() {
    console.log(`HTTPS listening on port ${settings.httpsPort}`);
})