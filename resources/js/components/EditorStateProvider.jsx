import AppContext from "@/context/AppContext";
import useAxios from "@/hooks/useAxios";
import { decryptString, getEncryptionKey } from "@/lib/utils";
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
      let notes = res.data;
      const key = await getEncryptionKey();
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].content && notes[i].content.trim() !== "") {
          notes[i].content = await decryptString(notes[i].content, key);
        }
      }
      setNotes(notes);
    })
  }, []);
  const [activeNote, setActiveNote] = useState(null);
  let val = {
    notes: notes || [],
    setNotes: setNotes,
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
