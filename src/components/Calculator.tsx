import { useEffect, useState } from "react";
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
  const [savingGoal, setSavingGoal] = useState<string>("500");
  const [offsettedGoal, setOffsettedGoal] = useState<number>(500);
  const [endBalance, setEndBalance] = useState<string>("0");
  const [avgBalance, setAvgBalance] = useState<string>("0");
  const [monthTransaction, setMonthTransaction] =
    useState<number[][]>(emptyTransactions);

  useEffect(() => {
    const updateOffsettedGoal = async () => {
      const offsettedGoal =
        Number(avgBalance) + Number(savingGoal) - Number(endBalance);
      if (!isNaN(offsettedGoal)) {
        setOffsettedGoal(offsettedGoal);
        if (user) {
          const userDocRef = doc(db, "users", user);
          await setDoc(userDocRef, {
            endBalance: endBalance,
            avgBalance: avgBalance,
            savingGoal: savingGoal,
          });
        }
      }
    };
    updateOffsettedGoal();
  }, [endBalance, avgBalance, savingGoal]);

  const googleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const userId = userCredential.user.uid;
      setUser(userId);

      const userDocRef = doc(db, "users", userId); // collection
      const userData = (await getDoc(userDocRef)).data();

      if (userData) {
        // User exists, read from firestore
        setEndBalance(userData.endBalance);
        setAvgBalance(userData.avgBalance);
        setSavingGoal(userData.savingGoal);
        const transactionsDocRef = collection(userDocRef, "transactions"); // sub-collection
        const transactionsDocsSnap = await getDocs(transactionsDocRef);
        const transactions = [[]];
        transactionsDocsSnap.forEach((day) => {
          transactions.push(day.data().curr);
        });
        setMonthTransaction(transactions);
      } else {
        // User does not exists, initialise firestore
        await setDoc(userDocRef, {
          endBalance: "0",
          avgBalance: "0",
          savingGoal: "500",
        });
        const transactionsDocRef = collection(userDocRef, "transactions");
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
        savingGoal={savingGoal}
        setSavingGoal={setSavingGoal}
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
