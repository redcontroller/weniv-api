import axios from "axios";
import path from 'path';
import util from 'util';
import fs from 'fs';
import BASE_URL from "./base_url.js";
import token from "./token.js";
import postIds from "./postId.js";

const writeFileAsync = util.promisify(fs.writeFile);

const uniqueSet = new Set(postIds);
const uniquePostIds = Array.from(uniqueSet);

const commentListApi = async ({ id, token, limit = 10, skip = 0 }) => {
  const res = await axios.get(
    `${BASE_URL}/post/${id}/comments/?limit=${limit}&skip=${skip}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  );
  return res.data;
};

// JSON 파일로 일괄 저장
(async () => {
    const accounts = Object.keys(token);
    const comments = [];
    for (let postId of uniquePostIds) {
        const comment = await commentListApi({ id: postId, token: token.holo_pro});
        comments.push(comment);
    }
    const outFileName = `comments.json`;
    const outFilePath = path.join('/backup/src/','../data', outFileName);
    try {
        writeFileAsync(outFilePath, JSON.stringify(comments, null, 2));
        console.log(`프로필 정보를 ${outFileName} 파일에 저장했습니다.`);
    } catch (err) {
        console.log('파일 저장 중 오류가 발생했습니다:', err);
    }
})();