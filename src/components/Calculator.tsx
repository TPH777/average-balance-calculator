import { useEffect, useState } from "react";
import { InitBar } from "./InitBar";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { TableFooter } from "./TableFooter";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, db, provider } from "../firebase/config";
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
    async () => {
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
        const transactionsDocRef = collection(userDocRef, "transactions");
        const transactionsDocsSnap = await getDocs(transactionsDocRef);

        const sortedDocs = transactionsDocsSnap.docs.sort((a, b) => {
          const dayA = parseInt(a.id.split(" ")[1], 10); // Extract day number
          const dayB = parseInt(b.id.split(" ")[1], 10);
          return dayA - dayB; // Numeric comparison
        });
        const transactions = sortedDocs.map((doc) => doc.data().curr); // Push in sorted order
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
          user={user}
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
