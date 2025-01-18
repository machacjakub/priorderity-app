/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: [ 'tailwindcss', 'tailwindcss-animated', 'postcss','antd', "date-fns" ],
	},
};

module.exports = nextConfig;
