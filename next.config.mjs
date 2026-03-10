/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    eslint: {
        // Disable ESLint during build to avoid version conflicts
        ignoreDuringBuilds: true,
    },
    typescript: {
        // Allow build to succeed even with type warnings
        ignoreBuildErrors: false,
    },
};

export default nextConfig;
