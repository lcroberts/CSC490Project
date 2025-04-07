import AppContext from "@/context/AppContext";
import { useContext } from "react";

/**
 * @typedef {Object} Note
 * @property {string} content - note content
 * @property {string} name - note title
 * @property {string} created_at - date note was created at
 */

/**
 * Wraps AppContext so that we can use this to get type hinting via jsdoc
 * @returns {{
 * notes: Note[]
 * activeNote: ?Number
 * setActiveNote: Function
 * }}
 */
export default function useAppState() {
  const state = useContext(AppContext);

  return state;
}
