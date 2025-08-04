import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // things that are defined are for security purposes which allow us to prevent
        // end users to modify the endpoint of the images
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // an advanced solution for getting an ? image or not loading the content of the image which were declined by google
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "referrer-policy",
            value: "no-referrer",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
