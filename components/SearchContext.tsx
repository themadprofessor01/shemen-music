"use client";

import { createContext, useContext, useState } from "react";

type SearchState = {
  query: string;
  setQuery: (q: string) => void;
};

const SearchContext = createContext<SearchState>({ query: "", setQuery: () => {} });

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
