import { Router } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { singOut, supabase } from "../utility/SupabaseClient";

const Logout = () => {
  useEffect(() => {
    const router = useRouter();
    const logout = async () => {
      await singOut();
      router.push("/signin");
    };
    logout();
  }, []);

  return <h1>Logging out</h1>;
};
export default Logout;
