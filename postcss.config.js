module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 14, // 基准值，可以根据设计稿的实际情况进行调整
            propList: ['*'], // 需要转换的属性列表，* 表示所有属性都进行转换
            minPixelValue: 2 // 最小像素值，低于该值的像素不会被转换
        },
    },
};