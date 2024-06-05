// import fetch from 'node-fetch';

// function fixedEncodeURIComponent(str) {
//     return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
//         return "%" + c.charCodeAt(0).toString(16);
//     });
// }

// const filePath = fixedEncodeURIComponent('../data/search_holo.txt');

// export default async function readData(url) {
//     try {
//         const res = await fetch(url);
//         const data = await res.text();
//         console.log(data);
//     } catch (err) {
//         throw new Error("Error fetching data:", err);
//     }
// }

// const filePath = '../data/search_holo.txt';
// readData(filePath);

// import path from 'path';
// const filePath = path.join('/backup/src/', '../data/search_holo.txt');

// fetch(filePath)
//     .then(res => {
//         if (!res.ok) {
//             throw new Error(`HTTP error: ${res.status}`);
//         }
//         return res.text();
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         throw new Error(`Fetch problem: ${err.message}`);
//     });

// import path from 'path';
import fs from 'fs';

// const fileName = 'search_holo.txt';
// const filePath = path.join('/backup/src/','../data', fileName);

export default function textRead(filePath) {
    try {
        const text = fs.readFileSync(filePath, 'utf8');
        return text;
    } catch(err) {
        console.log(err);
    }
    
}

// const text = textRead(filePath);
// console.log(text);