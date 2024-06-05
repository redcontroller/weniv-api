import axios from 'axios';
import BASE_URL from './base_url.js';

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
    await feed_detail({ token: token.holo_pro, limit: 20, skip: 0});
    await feed_detail({ token: token.holo_dev, limit: 20, skip: 0});
    
    const imgList = [...imgSet];
    console.log(imgList.join(','));
})();