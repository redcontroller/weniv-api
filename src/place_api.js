import axios from "axios";
import path from 'path';
import util from 'util';
import fs from 'fs';
import BASE_URL from "./base_url.js";
import token from "./token.js";
const writeFileAsync = util.promisify(fs.writeFile);


const placeListApi = async (accountname, token) => {
    const res = await axios.get(`${BASE_URL}/product/${accountname}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        },
        });
    return res.data;
};

const accountnames = ["holo_1", "holo_11", "holo_13", "holo16", "holo17", "holo_6", "holo_9", "holo_test10", "holo_test6", "holo_test8", "holo_test9", "holoholoholo", "holo_bab", "holo_bj", "holo_cat", "holo_deli", "holo_delicious", "holo_dev", "holo_dori", "holo_holo", "holo_jjup", "holo_pro", "holo_sad", "holo_yujin"];

// JSON 파일로 일괄 저장
(async () => {
    // const accounts = Object.keys(token);
    // const places = await placeListApi(accounts[0], token.holo_pro);
    // const outFileName = `place_test.json`;
    // const places = await placeListApi(accounts[1], token.holo_dev);
    // const outFileName = `place_dev.json`;
    const places = [];
    for (let accountname of accountnames) {
        const place = await placeListApi(accountname, token.holo_pro);
        places.push(place);
    }
    const outFileName = `place_all.json`;
    const outFilePath = path.join('/backup/src/','../data', outFileName);
    try {
        writeFileAsync(outFilePath, JSON.stringify(places, null, 2));
        console.log(`프로필 정보를 ${outFileName} 파일에 저장했습니다.`);
    } catch (err) {
        console.log('파일 저장 중 오류가 발생했습니다:', err);
    }
})();