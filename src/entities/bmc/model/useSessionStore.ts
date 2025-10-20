import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { BmcTemplateType } from "./types";

interface SessionState {
  sessionId: number | null;
  title: string | null;
  createdAt: Date;
  templateType: BmcTemplateType;
}

interface SessionActions {
  setSessionId: (sessionId: number, title: string, createdAt: Date, templateType: BmcTemplateType) => void;
  getSessionId: () => { sessionId: number, title: string, createdAt: Date, templateType: BmcTemplateType } | null;
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
        templateType: 'Color' as BmcTemplateType,

        setSessionId: (sessionId: number, title: string, createdAt: Date, templateType: BmcTemplateType) => {
          set({
            sessionId,
            title,
            createdAt,
            templateType
          }, false, "setSessionId");
        },

        getSessionId: () => {
          const state = get();
          if (!state.sessionId || !state.title) {
            return null;
          }
          return {
            sessionId: state.sessionId,
            title: state.title,
            createdAt: state.createdAt,
            templateType: state.templateType
          };
        },

        removeSessionId: () => {
          set({
            sessionId: null,
            title: null,
            templateType: 'Color' as BmcTemplateType
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