import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the user interface
interface User {
  username: string;
  email: string;
}

// Define the context type that includes `login`, `logout`, and `user`
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the context with an undefined initial value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a custom hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Create the UserProvider component to wrap the application and provide context
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize user state with value from localStorage
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Effect to sync the user state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage
    } else {
      localStorage.removeItem("user"); // Remove user from localStorage if logged out
    }
  }, [user]);

  // Login function to update the user state
  const login = (userData: User) => {
    setUser(userData); // Set user data in context
  };

  // Logout function to clear the user state
  const logout = () => {
    setUser(null); // Clear user data in context
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
