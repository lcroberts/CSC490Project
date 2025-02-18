import AppContext from "@/context/AppContext";
import { useContext } from "react";

/**
 * Wraps AppContext so that we can use this to get type hinting via jsdoc
 * @returns {{
 * }}
 */
export default function useAppstate() {
  const state = useContext(AppContext);
  return state;
}
