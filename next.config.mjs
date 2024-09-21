/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'ui-avatars.com',
            port: '',
            pathname: '/api/**',
            },
        ],
    },
    experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"]
	}
};

export default nextConfig;
