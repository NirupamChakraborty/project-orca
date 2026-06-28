let IS_PROD = false;  
const server = IS_PROD ?
    "https://my-vercel-production-url.com" :
    "http://localhost:8000"

export default server;