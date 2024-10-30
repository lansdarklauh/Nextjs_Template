import api from '../index';

export const UploadImg = (data) => {
    return new Promise((resolve, reject) => {
        fetch(((process.env.NEXT_PUBLIC_UPLOAD_IMG_API || '') + '/UploaderMember/Base64Image'), {
            method: 'post',
            body: data,
        }).then(async res => {
            if (res.ok && res.status === 200) {
                resolve(await res.json());
            } else {
                reject(res.statusText)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const AuthLogin = (params, headers) => {
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&') || '';
    const currentUrl = ((process.env.NEXT_PUBLIC_API || '') + '/User/AuthLogin' + (queryString ? ('?' + queryString) : ''))
    const arg = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Expires': '0',
            'Pragma': 'no-cache',
            ...headers
        },
        next: {
            revalidate: 0,
        }
    }
    return new Promise((resolve, reject) => {
        fetch(currentUrl, arg).then(async res => {
            if (res.ok && res.status === 200) {
                const json = await res.text();
                resolve(json);
            } else {
                reject(res.statusText)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const GetAdvert = (params) => {
    return api.request({
        url: '/Api/Advert',
        method: 'get',
        params,
        headers: {
            'Cache-Control': 'no-cache',
            'Expires': '0',
            'Pragma': 'no-cache',
        }
    })
}
