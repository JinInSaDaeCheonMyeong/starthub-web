export const CHAT_QUERY_KEYS = {
  sessions: {
    all: () => ["chat", "sessions"] as const,
    detail: (sessionId: number) => ["chat", "sessions", sessionId] as const,
  },
};
