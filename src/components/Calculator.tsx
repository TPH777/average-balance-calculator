import { useEffect, useState } from "react";
import { InitBar } from "./InitBar";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { TableFooter } from "./TableFooter";
import { db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import emptyTransactions, {
  setFirestore,
  sortTransactions,
} from "../functions/transactions";

export function Calculator({ user }: { user: string | null }) {
  const [savingGoal, setSavingGoal] = useState<string>("500");
  const [offsettedGoal, setOffsettedGoal] = useState<number>(500);
  const [endBalance, setEndBalance] = useState<string>("0");
  const [avgBalance, setAvgBalance] = useState<string>("0");
  const [monthTransaction, setMonthTransaction] =
    useState<number[][]>(emptyTransactions);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const userDocRef = doc(db, "users", user);
        const userData = (await getDoc(userDocRef)).data();

        if (userData) {
          // User exists, read from Firestore
          setEndBalance(userData.endBalance);
          setAvgBalance(userData.avgBalance);
          setSavingGoal(userData.savingGoal);
          setMonthTransaction(await sortTransactions(userDocRef));
        } else {
          // User does not exist, initialize Firestore
          setFirestore(
            userDocRef,
            endBalance,
            avgBalance,
            savingGoal,
            monthTransaction
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [user]);

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

  return (
    <>
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
