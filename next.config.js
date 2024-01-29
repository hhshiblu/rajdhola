module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rajdhola.s3.amazonaws.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  env: {
    metadataBase:
      process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3000",
  },
};
