/// <reference types="vite/client" />

interface EIP6963ProviderInfo {
    rdns: string
    uuid: string
    name: string
    icon: string
  }
  
  interface EIP6963ProviderDetail {
    info: EIP6963ProviderInfo
    provider: EIP1193Provider
  }
  
  type EIP6963AnnounceProviderEvent = {
    detail: {
      info: EIP6963ProviderInfo
      provider: Readonly<EIP1193Provider>
    }
  }
  
  interface EIP1193Provider {
    isStatus?: boolean
    host?: string
    path?: string
    sendAsync?: (
      request: { method: string; params?: Array<unknown> },
      callback: (error: Error | null, response: unknown) => void
    ) => void
    send?: (
      request: { method: string; params?: Array<unknown> },
      callback: (error: Error | null, response: unknown) => void
    ) => void
    request: (request: {
      method: string
      params?: Array<unknown>
    }) => Promise<unknown>
  }
  // global.d.ts
interface Window {
  solana?: {
      isPhantom: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
  };
}


declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}
