import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { Button, Image } from "react-bootstrap";
import googleLogo from "../pictures/google-logo.png";

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
        <Button variant="danger" className="button" onClick={googleSignOut}>
          Sign Out
        </Button>
      ) : (
        <Button variant="dark" className="button" onClick={googleSignIn}>
          <Image
            src={googleLogo}
            alt="logo"
            width="25"
            height="25"
            className="align-top me-2"
          />
          Google Sign In
        </Button>
      )}
      <br />
    </>
  );
}
