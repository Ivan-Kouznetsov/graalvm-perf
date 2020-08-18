"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const http = require("http");
const https = require("https");
const util_1 = require("util");
const httpkeepAliveAgent = new http.Agent({ keepAlive: true });
const httpskeepAliveAgent = new https.Agent({ keepAlive: true });
const splitUrl = (url) => {
    var _a, _b;
    const parts = url.trim().match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);
    if (parts === null)
        throw `Invalid url: ${url}`;
    const protocol = parts[2];
    const rawHostname = parts[4];
    const path = parts[5] + ((_a = parts[6]) !== null && _a !== void 0 ? _a : '');
    const port = /(?<=:)\d+/.test(rawHostname) ? ((_b = /(?<=:)\d+/.exec(rawHostname)) !== null && _b !== void 0 ? _b : [null])[0] : null;
    const hostnameMatches = /(\w|\.)+(?=:{0,1})/.exec(rawHostname);
    if (hostnameMatches === null)
        throw `Invalid url: ${url}`;
    return { protocol, hostname: hostnameMatches[0], path, port };
};
const headerArrayToHashTable = (rawHeaders) => {
    const result = {};
    for (let i = 0; i < rawHeaders.length; i = i + 2) {
        result[rawHeaders[i]] = rawHeaders[i + 1];
    }
    return result;
};
const tryParseJson = (str) => {
    try {
        return JSON.parse(str);
    }
    catch (_a) {
        return null;
    }
};
exports.request = (url, method, headers, body, timeout) => {
    const urlParts = splitUrl(url);
    return new Promise((resolve, reject) => {
        var _a;
        if (['http', 'https'].includes(urlParts.protocol.toLowerCase()) === false) {
            reject('Only http and https supported');
            return;
        }
        if (timeout) {
            setTimeout(() => {
                reject('Timed out');
            }, timeout);
        }
        if (body !== undefined) {
            headers['Content-Length'] = new util_1.TextEncoder().encode(body).length.toString();
            if (headers['Content-Type'] === undefined) {
                if (!/{.+}/.test(body)) {
                    headers['Content-Type'] = 'text/plain';
                }
                else {
                    headers['Content-Type'] = 'application/json';
                }
            }
        }
        const options = {
            protocol: urlParts.protocol + ':',
            hostname: urlParts.hostname,
            port: (_a = urlParts.port) !== null && _a !== void 0 ? _a : (urlParts.protocol === 'http' ? 80 : 443),
            path: urlParts.path,
            method: method,
            headers: headers,
            agent: urlParts.protocol === 'http' ? httpkeepAliveAgent : httpskeepAliveAgent,
        };
        const req = (urlParts.protocol === 'http' ? http : https)
            .request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const json = tryParseJson(data);
                resolve({
                    json,
                    string: data,
                    headers: headerArrayToHashTable(res.rawHeaders),
                    status: res.statusCode,
                });
            });
        })
            .on('error', (err) => {
            reject(err.message);
        });
        if (body)
            req.write(body);
        req.end();
    });
};

