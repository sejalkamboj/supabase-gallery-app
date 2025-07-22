import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import Login from "../components/Login";
import Dashboard from "./Dashboard";

const LoginPage = () => {
    const [session, setSession] = useState(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => setSession(data.session));
        supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    }, []);
    // console.log("Session:", session);
    return (
        <div className="min-h-screen bg-gray-100">
            {!session ? (
                <Login />
            ) : (
                <Dashboard />
            )}
        </div>
    );
}
export default LoginPage