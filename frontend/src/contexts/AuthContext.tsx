// src/context/AuthContext.tsx
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig.ts"; // Ensure you import correctly without .tsx
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth"; // Import necessary Firebase Auth methods

interface AuthContextType {
  user: User | null; // Use the User type for user state
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>; // Change logout to return a Promise
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null); // Use User type for user state

  // Track the user's auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Save the user data
    });
    return () => unsubscribe(); // Unsubscribe from the listener on unmount
  }, []);

  // Register function
  const register = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", result.user);
    } catch (error) {
      console.error("Registration failed:", (error as Error).message);
      throw error;
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", result.user);
    } catch (error) {
      console.error("Login failed:", (error as Error).message);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Logout failed:", (error as Error).message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
