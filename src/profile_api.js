import axios from "axios";
import BASE_URL from "./base_url.js";
import token from "./token.js";
import path from 'path';
import textRead from "./textRead.js";
import util from 'util';
import fs from 'fs';
const writeFileAsync = util.promisify(fs.writeFile);

const fileName = 'search_holo.json';
const filePath = path.join('/backup/src/','../data', fileName);

const data = textRead(filePath);
const dataArray = JSON.parse(data);

const profileApi = async (accountname, token) => {
    try {
        const res = await axios.get(`${BASE_URL}/profile/${accountname}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });
        // console.log(res.data);

        return (res.data);

        // JSON 파일로 개별 저장
        // const fileName = `profile_${res.data.profile.username}.json`;
        // const filePath = path.join('/backup/src/','../data', fileName);
        // try {
        //     await writeFileAsync(filePath, JSON.stringify(res.data, null, 2));
        //     console.log(`프로필 정보를 ${fileName} 파일에 저장했습니다.`);
        // } catch (err) {
        //     console.log('파일 저장 중 오류가 발생했습니다:', err);
        // }
    } catch (err) {
        console.error(err);
    }
};

// const accounts = Object.keys(token);
// profileApi(accounts[0], token.holo_pro); // test 계정
// profileApi(accounts[1], token.holo_dev); // dev 계정

// dataArray.forEach(async (user) => {
//     await profileApi(user.accountname, token.holo_dev);
// });

const fetchProfiles = async () => {
    const profiles = {};
    for (const user of Object.values(dataArray)) {
        const data = await profileApi(user.profile.accountname, token.holo_dev);
        if (data) {
            profiles[data.profile.accountname] = data;
        }
    }
    return profiles;
};

// JSON 파일로 일괄 저장
(async () => {
    const profiles = await fetchProfiles();
    const outFileName = `profile_holo.json`;
    const outFilePath = path.join('/backup/src/','../data', outFileName);
    try {
        writeFileAsync(outFilePath, JSON.stringify(profiles, null, 2));
        console.log(`프로필 정보를 ${outFileName} 파일에 저장했습니다.`);
    } catch (err) {
        console.log('파일 저장 중 오류가 발생했습니다:', err);
    }
})();