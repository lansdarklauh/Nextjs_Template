const api = {}

api.request = (obj) => {
    const { url = '', method = 'get', params = {}, headers = {}, data = {} } = obj;
    const temp = {}
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
            temp[key] = params[key]
        }
    })
    let queryString = Object.keys(temp).map(key => key + '=' + temp[key]).join('&') || '';
    const currentUrl = ((process.env.NEXT_PUBLIC_API || '') + url + (queryString ? ('?' + queryString) : ''))
    const arg = {
        method: method,
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
    if (method === 'post') {
        arg.body = JSON.stringify(data);
    }
    return new Promise((resolve, reject) => {
        fetch(currentUrl, arg).then(async res => {
            if (res.ok && res.status === 200) {
                const contentType = res.headers.get('content-type');

                let data;
                if (contentType.includes('application/json')) {
                    data = await res.json();
                } else if (contentType.includes('text/')) {
                    data = await res.text();
                } else {
                    // 处理其他类型的响应
                    data = await res.blob(); // 或者其他合适的方法
                }
                resolve(data);
            } else {
                reject(res.statusText)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export default api;