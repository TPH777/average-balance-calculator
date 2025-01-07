import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase/config";

interface AccountButtonProps {
  user: string | null;
  setUser: (userId: string | null) => void;
}

export function AccountButton({ user, setUser }: AccountButtonProps) {
  const googleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const userId = userCredential.user.uid;
      setUser(userId);
    } catch (error) {
      console.log(error);
    }
  };

  const googleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user ? (
        <button onClick={googleSignOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}
      <br />
    </>
  );
}
