import { createContext, useContext, useEffect, useState } from "react"; 
import supabaseClient from "../supabaseClient"; 

const AuthContext = createContext(null); 

export function useAuth() { return useContext(AuthContext); } 

export function AuthProvider({ children }) { 
const [session, setSession] = useState(null); 
const [loading, setLoading] = useState(true); 
useEffect(() => { 
  // Get session on mount 
  supabaseClient.auth.getSession().then(({ data: { session } }) => { 
    setSession(session); 
    setLoading(false); 
  }); 
  // Subscribe 
  const { data: { subscription }, } = supabaseClient.auth.onAuthStateChange((_event, session) => { 
    setSession(session); 
    setLoading(false); 
  }); 
  // Cleanup 
  return () => subscription.unsubscribe(); 
}, []); 

return ( 
<AuthContext.Provider value={{ session, loading }}> 
  {children} 
</AuthContext.Provider> ); }