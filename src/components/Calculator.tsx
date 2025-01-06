import { useState } from "react";
import { InitBar } from "./InitBar";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { TableFooter } from "./TableFooter";
import { daysInMonth } from "../functions/date";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import GoogleButton from "react-google-button";

export function Calculator() {
  const [offsettedGoal, setOffsettedGoal] = useState<number>(500);
  const [endBalance, setEndBalance] = useState<string>("0");
  const [avgBalance, setAvgBalance] = useState<string>("0");
  const [monthTransaction, setMonthTransaction] = useState<number[][]>(
    Array.from({ length: daysInMonth }, () => [])
  );

  const googleSignIn = async () => {
    await signInWithPopup(auth, googleProvider)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <GoogleButton onClick={googleSignIn} />
      <InitBar
        setOffsettedGoal={setOffsettedGoal}
        endBalance={endBalance}
        setEndBalance={setEndBalance}
        avgBalance={avgBalance}
        setAvgBalance={setAvgBalance}
      />
      <table>
        <TableHeader />
        <TableBody
          offsettedGoal={offsettedGoal}
          monthTransaction={monthTransaction}
          setMonthTransaction={setMonthTransaction}
        />
        <TableFooter
          lastEndBalance={Number(endBalance)}
          lastAvgBalance={Number(avgBalance)}
          monthTransaction={monthTransaction}
        />
      </table>
    </>
  );
}
