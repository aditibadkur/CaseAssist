/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      CLERK_API_KEY: process.env.CLERK_API_KEY,
    },
  };
  
  export default nextConfig;
  