import AppContext from "@/context/AppContext";
import useAxios from "@/hooks/useAxios";
import { useState } from "react";

/**
 * Wraps anything that requires access to application state. Hanldes
 * fetching and inserting data into the context.
 */
export default function EditorStateProvider({ children }) {
  const [notes, setNotes] = useState(null);
  const http = useAxios();
  useState(() => {
    http.get('/api/notes').then(async (res) => {
      setNotes(res.data);
    })
  }, []);
  const [activeNote, setActiveNote] = useState(null);
  let val = {
    notes: notes || [],
    activeNote: activeNote,
    setActiveNote: setActiveNote,
  };
  val.activeNote = activeNote;
  val.setActiveNote = setActiveNote;

  return (
    <AppContext.Provider value={val}>
      {children}
    </AppContext.Provider>
  )
}
