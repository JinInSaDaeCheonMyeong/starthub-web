import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SessionState {
  sessionId: number | null;
  title: string | null;
  createdAt: Date;
}

interface SessionActions {
  setSessionId: (sessionId: number, title: string, createdAt: Date) => void;
  getSessionId: () => { sessionId: number, title: string, createdAt: Date };
  removeSessionId: () => void;
}

type SessionStore = SessionState & SessionActions;

const useSessionStore = create<SessionStore>()(
  devtools(
    persist(
      (set, get) => ({
        sessionId: null,
        title: null,
        createdAt: new Date(),

        setSessionId: (sessionId: number, title: string, createdAt: Date) => {
          set({
            sessionId,
            title,
            createdAt
          }, false, "setSessionId");
        },

        getSessionId: () => {
          const state = get();
          return {
            sessionId: state.sessionId!,
            title: state.title!,
            createdAt: state.createdAt
          };
        },

        removeSessionId: () => {
          set({
            sessionId: null,
            title: null
          }, false, "removeSessionId")
        },
      }),
      {
        name: "session-store"
      }
    ),
    { name: "session-store" }
  )
);

export default useSessionStore;