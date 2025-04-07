import AppContext from "@/context/AppContext";
import { useContext, useMemo } from "react";

/**
 * @typedef {Object} Note
 * @property {number} id
 * @property {string} content - note content
 * @property {string} name - note title
 * @property {string} created_at - date note was created at
 */

/**
 * Wraps AppContext so that we can use this to get type hinting via jsdoc
 * @returns {{
 * notes: Note[]
 * setNotes: Function
 * activeNote: ?Number
 * setActiveNote: Function
 * activeNoteInfo: Note
 * }}
 */
export default function useAppState() {
  const state = useContext(AppContext);
  const activeNoteInfo = useMemo(() => {
    return state.notes[state.activeNote];
  }, [state.activeNote]);
  return {...state, activeNoteInfo};
}
