export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?:string
      NODE_ENV?:string
      DIST_DIR?:string
      API_URL?:string
    }
  }
}
