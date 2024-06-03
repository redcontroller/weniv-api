import axios from "axios";

// const BASE_URL = 'https://api.mandarin.weniv.co.kr';
const login_info = [
    {
    email: 'holo_nyam@gmail.com',
    password: 'holo_nyam',
    },
    {
        email: 'holo_dev@gmail.com',
        password: 'holo_dev',
    },
];

const login = async ( {email, password} ) => {
    try {
        const res = await axios.post(
            'https://api.mandarin.weniv.co.kr/user/login',
            {
                user: {
                    email: email,
                    password: password,
                }
            },
            {
                headers: {
                    'Content-type': 'application/json',
                },
            },
        );
        console.log(res.data);
        return (res);
    } catch (err) {
        throw new Error(err);
    }
};

login(login_info[1]);