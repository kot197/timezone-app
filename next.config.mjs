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
	},
    webpack: (config, { isServer }) => {
        // Only apply the loader in server-side environment
        if (isServer) {
          config.module.rules.push({
            test: /\.html$/i,
            use: 'raw-loader',
          });
        }
    
        return config;
    },
};

export default nextConfig;
