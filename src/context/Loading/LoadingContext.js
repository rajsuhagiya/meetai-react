import { createContext, useState, useContext } from "react";

// Create the context
const LoadingContext = createContext();

// Provider component
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const setLoadingState = (state) => setLoading(state);

  return (
    <LoadingContext.Provider value={{ loading, setLoadingState }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the LoadingContext
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
