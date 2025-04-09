/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['nuvvezmucfeaswkmerbs.supabase.co', 'images.unsplash.com', 'localhost'],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  // Configurazione ottimizzata per la cache
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.cache = false // Disabilita la cache in development per evitare problemi
    }
    return config
  },
}

export default nextConfig 