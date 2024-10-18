// src/context/AuthContext.tsx
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().userRole);
        } else {
          setUserRole(null);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, [db]);

  const register = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", result.user);
      await setDoc(doc(db, "users", result.user.uid), {
        username: result.user.email?.split("@")[0] || "",
        userRole: "user",
        userUid: result.user.uid,
        userEmail: result.user.email || "",
        userAddresses: [],
        userPhone: "",
      });
      setUser(result.user);
    } catch (error) {
      console.error("Registration failed:", (error as Error).message);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", result.user);

      const userDoc = await getDoc(doc(db, "users", result.user.uid));
      if (userDoc.exists()) {
        setUserRole(userDoc.data().userRole);
      }
    } catch (error) {
      console.error("Login failed:", (error as Error).message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      setUserRole(null);
    } catch (error) {
      console.error("Logout failed:", (error as Error).message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
