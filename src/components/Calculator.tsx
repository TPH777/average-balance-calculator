import { useState } from "react";
import { InitBar } from "./InitBar";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { TableFooter } from "./TableFooter";
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase/config";
import GoogleButton from "react-google-button";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import emptyTransactions from "../functions/number";

export function Calculator() {
  const [user, setUser] = useState<string | null>(null);
  const [offsettedGoal, setOffsettedGoal] = useState<number>(500);
  const [endBalance, setEndBalance] = useState<string>("0");
  const [avgBalance, setAvgBalance] = useState<string>("0");
  const [monthTransaction, setMonthTransaction] =
    useState<number[][]>(emptyTransactions);

  const googleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user.uid;
      setUser(user);

      const userDocRef = doc(db, "users", user); // collection
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // User exists, read from firestore
        const transactionsDocRef = collection(userDocRef, "transactions"); // sub-collection
        const transactionsDocsSnap = await getDocs(transactionsDocRef);
        const transactions = [[]];
        transactionsDocsSnap.forEach((day) => {
          transactions.push(day.data().curr);
        });
        setMonthTransaction(transactions);
      } else {
        // User does not exists, initialise firestore
        await setDoc(userDocRef, {});
        const transactionsDocRef = collection(userDocRef, "transactions"); // sub-collection
        // Create a document for each row
        emptyTransactions.forEach((transactions: number[], day: number) => {
          const dayDocRef = doc(transactionsDocRef, `day ${day + 1}`);
          setDoc(dayDocRef, { curr: transactions });
        });
        setMonthTransaction(emptyTransactions);
      }
    } catch (error) {
      console.log(error);
    }
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
