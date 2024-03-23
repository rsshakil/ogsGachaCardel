import axios from 'axios';
import { baseURL } from '../restapi/queries';

// アクセストークンの取得
function getAccessToken() {
    return localStorage.getItem('token');
}

// インスタンスの生成
export const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

//
instance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    async (res) => {
        //console.log("res: ", res);

        if (!res.config.url.match("/app/editor/deploy")) {
            return res;
        }

        // デプロイAPIの場合は、トークンが切れていなくても、トークンを更新する。
        // Fargate (deploy.mjs)に入ってからトークンが切れると、更新が難しいため。
        try {
            const { token } = await getRefreshTokenAPI();
            localStorage.setItem('token', token);
            // sessionStorage.setItem('refresh_token', refresh_token);
            if (token == null) {
                throw new Error('Unauthorized');
            }

            instance.defaults.headers.common['Authorization'] = token;

            console.log("Refreshed token by force");
        } catch (_error) {
            console.log("Failed to refresh token by force");
        }

        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const { token, refresh_token } = await getRefreshTokenAPI();
                    localStorage.setItem('token', token);
                    // localStorage.setItem('refresh_token', refresh_token);
                    if (token == null) {
                        throw new Error('Unauthorized');
                    }

                    instance.defaults.headers.common['Authorization'] = token;

                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }
        return Promise.reject(err);
    }
);

async function getRefreshTokenAPI() {
    const apiURL =
        process.env.REACT_APP_ENV !== 'production'
            ? process.env.REACT_APP_AUTH_URL_LOCALHOST
            : process.env.REACT_APP_AUTH_URL_PRODUCTION;

    const origin =
        process.env.REACT_APP_ENV !== 'production'
            ? process.env.REACT_APP_AUTH_URL_LOCALHOST
            : process.env.REACT_APP_AUTH_URL_PRODUCTION;

    try {
        const headers = {
            'Content-Type': 'application/json',
            Accept: '*/*',
            'Access-Control-Allow-Origin': origin,
            Authorization: `Bearer ${getAccessToken()}`,
        };
        const parameter = {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            mode: 'cors',
        };
        const response = await fetch(`${apiURL}/auth/refresh`, parameter);
        const result = await response.json();
        if (result.error) throw new Error(result.error);
        const returnData = {
            token: result.token
        };

        return returnData;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}
