const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com']
    },

    webpack: (config) => {
        config.resolve.alias['@'] = path.join(__dirname, 'components');
        return config;
    },
};

export default nextConfig;
