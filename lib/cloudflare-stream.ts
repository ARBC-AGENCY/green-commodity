/** Shared shape of the Cloudflare Stream player SDK object. */
export type StreamPlayer = {
  muted: boolean;
  addEventListener: (type: string, listener: () => void) => void;
  removeEventListener: (type: string, listener: () => void) => void;
};

declare global {
  interface Window {
    Stream?: (el: HTMLIFrameElement) => StreamPlayer;
  }
}
