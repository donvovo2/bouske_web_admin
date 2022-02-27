import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { singOut, supabase } from "../utility/SupabaseClient";

type AuthContextType = {
  user: User | null;
  //login: () => Promise<void>;
  logout: () => Promise<void>;
};

const Context = createContext<AuthContextType | null>(null);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState(supabase.auth.user());

  useEffect(() => {
    supabase.auth.onAuthStateChange(() => {
      setUser(supabase.auth.user());
    });
  }, []);

//   const login = async () => {
//     await supabase.auth.signIn({
//       provider: "github",
//     });
//   };

  const logout = async () => {
     await singOut();
     setUser(null);
     router.push("/signin");
   
  };

  const exposed = {
    user,
   // login,
    logout
  };
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);
export default Provider;
