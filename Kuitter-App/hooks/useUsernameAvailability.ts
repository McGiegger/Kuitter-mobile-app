import { useState } from "react";
import supabaseClient from "../supabaseClient";

export function useUsernameAvailability() {
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkUsername = async (usernameToCheck: string, currentUserId?: string) => {
    if (!usernameToCheck.trim()) {
      setError("Username is required");
      setAvailable(null);
      return;
    }

    if (usernameToCheck.length < 3) {
      setError("Username must be at least 3 characters");
      setAvailable(null);
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(usernameToCheck)) {
      setError("Username can only contain letters, numbers, and underscores");
      setAvailable(null);
      return;
    }

    // Normalize username to lowercase for case-insensitive checking
    const normalizedUsername = usernameToCheck.toLowerCase();

    setLoading(true);
    setError(null);
    setAvailable(null);

    try {
      let query = supabaseClient
        .from("users")
        .select("id")
        .eq("username", normalizedUsername);
      
      if (currentUserId) {
        query = query.neq("id", currentUserId);
      }
      
      const { data, error: dbError } = await query.maybeSingle();

      if (dbError) {
        setError("Error checking username availability");
        setAvailable(null);
      } else {
        if (data) {
          setError("Oops. That username is already taken");
          setAvailable(false);
        } else {
          setError(null);
          setAvailable(true);
        }
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setAvailable(null);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setAvailable(null);
    setError(null);
    setLoading(false);
  };

  return { available, loading, error, checkUsername, reset };
}
