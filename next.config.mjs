/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ["@untitledui/icons"],
    },
    async redirects() {
        return [
            { source: "/index.html", destination: "/", permanent: true },
            { source: "/ai-enablement.html", destination: "/ai-enablement", permanent: true },
            { source: "/strategy-horizon.html", destination: "/strategy-horizon", permanent: true },
            { source: "/innovation-sprints.html", destination: "/innovation-sprints", permanent: true },
        ];
    },
};

export default nextConfig;
