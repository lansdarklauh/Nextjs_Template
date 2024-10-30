// @ts-check

/** @type {import('next').NextConfig} */
const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')()

const getBuildTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const nextConfig = {
    /* config options here */
    trailingSlash: true,
    sassOptions: {
        includePaths: [path.join(__dirname, './styles')],
        prependData: `@import "./src/assets/styles/main.scss";`
    },
    experimental: {
        optimizePackageImports: ['antd'],
    },
    env: {
        NEXT_PUBLIC_APP_VERSION: getBuildTime(),
    },
    async redirects() {
        return [
            {
                source: '/settlein',
                destination: '/settlein/basic',
                permanent: true,
            }
        ]
    }
}

module.exports = process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig