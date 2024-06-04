import axios from 'axios';
import BASE_URL from './base_url.js';

const token = {
    test: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDM0MDllYjJjYjIwNTY2M2JhMTA4NSIsImV4cCI6MTcyMjQ1Nzc3MiwiaWF0IjoxNzE3MjczNzcyfQ.W6tCtAgufDx_6xIwrdU-S-hhnOEH1S9Sg3hMonPpmTI',
    dev: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2NhZDk5YjJjYjIwNTY2MzhhZWQyNiIsImV4cCI6MTcyMjQ1NzY3MCwiaWF0IjoxNzE3MjczNjcwfQ.PmZSkd62aUo-9swD1DjeciYjSlOxJoQp9L5XqIdxDP0',
};

const imgSet = new Set();

const feed_detail = async ({ token, limit = 10, skip = 0 }) => {
    const query = `?limit=${limit}&skip=${skip}`;
    const res = await axios.get(`${BASE_URL}/post/feed/${query}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        },
    });
    
    res.data.posts.forEach(feed => {
        if (feed.image.includes(",")) {
            feed.image.split(",").forEach(img => imgSet.add(img.trim()));
        } else {
            imgSet.add(feed.image);
        }
    });

    return res;
};

(async () => {
    await feed_detail({ token: token.test, limit: 20, skip: 0});
    await feed_detail({ token: token.dev, limit: 20, skip: 0});
    
    const imgList = [...imgSet];
    console.log(imgList.join(','));
})();