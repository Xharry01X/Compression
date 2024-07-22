const express = require('express');
const https = require('https');
const fs = require('fs');
const util = require("util");
const path = require('path');
const Queue = require('better-queue');

const app = express();
const port = 3000;

const data = [
    "https://routinehub.co/user/JonathanSetzer"
];
const API_KEY = "5Y7PW9FBOHHTG8OXMFGIPZHVTJRFR1QSHUFVM2PTX0TXBDDZVC24U8FW4U70Z8EBVH5FSELSMRGFWYBQ";  // Replace with your actual API key
const config = (url) => {
    return {
        hostname: 'app.scrapingbee.com',
        port: 443,
        path: util.format('/api/v1?api_key=%s&url=%s', API_KEY, encodeURIComponent(url)),
        method: 'GET'
    };
};

const save = (fileName, html) => {
    fs.writeFile(fileName, html, function (err) {
        if (err) return console.log(err);
        console.log("Document Saved:", fileName);
    });
};

const getFileNameFromUrl = (url) => {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname.replace(/\//g, '_'); // Replace / with _
    return pathname + '.html';
};

const q = new Queue((url, cb) => {
    let options = config(url);
    console.log(`Requesting: ${url}`);
    let req = https.request(options, res => {
        console.log(`\nStatusCode: ${res.statusCode}`);
        let fileName = getFileNameFromUrl(url);
        let body = [];
        res
            .on('data', html => {
                body.push(html);
            })
            .on('end', () => {
                body = Buffer.concat(body).toString();
                if (res.statusCode === 200) {
                    save(fileName, body);
                    cb(null, body);
                } else {
                    cb(new Error(`Failed to fetch ${url}. Status Code: ${res.statusCode}`));
                }
            });
    });
    req.on('error', err => {
        console.error(err.message);
        cb(err);
    });
    req.end();
});

// /////////////////////////
// Task-Level Events
// /////////////////////////
q.on('task_started', (taskId, obj) => {
    console.log('task_started', taskId, obj);
});

q.on('task_finish', (taskId, result, stats) => {
    console.log('task_finish', taskId, stats);
});

q.on('task_failed', (taskId, err, stats) => {
    console.log('task_failed', taskId, err, stats);
});

// /////////////////////////
// Queue-Level Events
// /////////////////////////
// All tasks have been pulled off of the queue
// (there may still be tasks running!)
q.on('empty', () => {
    console.log('empty');
});

// There are no more tasks on the queue and no tasks running
q.on('drain', () => {
    console.log('drain');
});

// /////////////////////////
// Express Endpoint
// /////////////////////////
app.get('/scrape', (req, res) => {
    data.forEach(function (item) {
        q.push(item);
    });
    res.send('Scraping started');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
