import AppContext from "@/context/AppContext";

/**
 * Wraps anything that requires access to application state. Hanldes
 * fetching and inserting data into the context.
 */
export default function EditorStateProvider({ children }) {
  let val = {};

  return (
    <AppContext.Provider value={val}>
      {children}
    </AppContext.Provider>
  )
}
