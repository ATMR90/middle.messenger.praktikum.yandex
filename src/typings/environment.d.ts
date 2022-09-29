export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
			PORT?:number
			NODE_ENV?:string
			DIST_DIR?:string
			API_URL?:string
    }
  }
}
