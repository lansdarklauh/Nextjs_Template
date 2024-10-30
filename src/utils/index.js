export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

export const transformBase64 = async (imageUrl) => {
    // 使用 fetch 获取图片数据
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // 创建 FileReader 对象
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        // 定义读取完成后的回调函数
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;

        // 读取 Blob 数据为 Base64 编码
        reader.readAsDataURL(blob);
    });
}

export const getFileFromUrl = async (imageUrl, name) => {
    const fileName = name || imageUrl.split('/').pop();
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const file = new File([blob], fileName, { type: blob.type });

    return new Promise((resolve) => {
        resolve(file);
    });
}

export const diveArray = (arr, num) => {
    if (num === 0) return []
    let list = [];
    let subList = [];
    for (let i = 0; i < arr.length; i = i + 1) {
        if (subList.length % num === 0) {
            subList = [arr[i]];
            list.push(subList);
        } else {
            subList.push(arr[i]);
        }
    }
    return list
}

export const exportBlob = (blob, filename) => {
    // 创建一个 URL 供下载使用
    const url = URL.createObjectURL(blob);

    // 创建一个隐藏的 <a> 标签
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;

    // 将 <a> 标签添加到文档中
    document.body.appendChild(a);

    // 触发点击事件以开始下载
    a.click();

    // 移除 <a> 标签
    document.body.removeChild(a);

    // 释放 URL 对象
    URL.revokeObjectURL(url);
}