import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "src/@types/user";

interface UserContextProps {
  user: User | null;
  removeUserFromLocalStorage: () => Promise<void>;
  setUserInLocalStorage: (user: User) => Promise<void>;
  getUserInLocalStorage: () => Promise<void>;
}

const UserContext = createContext({} as UserContextProps);

export const useUser = () => useContext(UserContext);

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const getUserInLocalStorage = async () => {
    const userJSON = await AsyncStorage.getItem("@user");
    const user = userJSON ? (JSON.parse(userJSON) as User) : null;

    setUser(user);
  };

  const setUserInLocalStorage = async (user: User) => {
    await AsyncStorage.setItem("@user", JSON.stringify(user));
    setUser(user);
  };

  const removeUserFromLocalStorage = async () => {
    await AsyncStorage.removeItem("@user");
    setUser(null);
  };

  useEffect(() => {
    getUserInLocalStorage();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        getUserInLocalStorage,
        setUserInLocalStorage,
        removeUserFromLocalStorage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
