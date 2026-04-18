import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  userToken: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [userToken, setUserToken] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Check token on app start
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          setUserToken(token);
        }
      } catch (error) {
        console.log("Token check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  // LOGIN
  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
      setUserToken(token);
    } catch (error) {
      console.log("Login save error:", error);
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setUserToken(null);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};