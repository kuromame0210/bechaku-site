interface GtagEvent {
  (command: "config", targetId: string, config?: Record<string, unknown>): void
  (command: "event", action: string, params?: Record<string, unknown>): void
  (command: "js", date: Date): void
  (command: "set", params: Record<string, unknown>): void
}

interface Window {
  gtag: GtagEvent
  dataLayer: unknown[]
}
