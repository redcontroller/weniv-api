import axios from 'axios';
import BASE_URL from './base_url.js';
import token from './token.js';

const userSearch = async (keyword, token) => {
    const res = await axios.get(
        `${BASE_URL}/user/searchuser/?keyword=${keyword}`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        },
    );
    console.log(JSON.stringify(res.data));
    return res;
};

userSearch('holo_', token.holo_dev);
// userSearch('개발자', token.holo_dev);
// userSearch('홀로', token.holo_dev);
// userSearch('프로', token.holo_dev);