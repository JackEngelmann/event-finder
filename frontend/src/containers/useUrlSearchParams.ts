import { useLocation } from "react-router";

export function useUrlSearchParams() {
  return new URLSearchParams(useLocation().search)
}