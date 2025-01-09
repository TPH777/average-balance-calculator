import { useEffect, useState } from "react";
import { InitBar } from "./InitBar";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { TableFooter } from "./TableFooter";
import { db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  emptyTransactions,
  initFirestore,
  sortTransactions,
  updateField,
} from "../functions/transactions";
import { maxDaysInMonth } from "../functions/date";
import { Button, Spinner, Table } from "react-bootstrap";

export function Calculator({ user }: { user: string | null }) {
  const [savingGoal, setSavingGoal] = useState<string>("500");
  const [offsettedGoal, setOffsettedGoal] = useState<number>(500);
  const [endBalance, setEndBalance] = useState<string>("0");
  const [avgBalance, setAvgBalance] = useState<string>("0");
  const [monthTransaction, setMonthTransaction] = useState<number[][]>(
    emptyTransactions(maxDaysInMonth)
  );
  const [isCurr, setIsCurr] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        return;
      }
      setIsLoading(true);
      setIsCurr(1);
      try {
        const userDocRef = doc(db, "users", user);
        const userData = (await getDoc(userDocRef)).data();

        if (userData) {
          // User exists, read from Firestore
          setEndBalance(userData.endBalance[1]);
          setAvgBalance(userData.avgBalance[1]);
          setSavingGoal(userData.savingGoal[1]);
          setMonthTransaction(await sortTransactions(userDocRef, isCurr));
        } else {
          // User does not exist, initialize Firestore
          initFirestore(
            userDocRef,
            endBalance,
            avgBalance,
            savingGoal,
            monthTransaction
          );
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    const changeMonthData = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const userDocRef = doc(db, "users", user);
        const userData = (await getDoc(userDocRef)).data();

        if (userData) {
          setEndBalance(userData.endBalance[isCurr]);
          setAvgBalance(userData.avgBalance[isCurr]);
          setSavingGoal(userData.savingGoal[isCurr]);
          setMonthTransaction(await sortTransactions(userDocRef, isCurr));
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    changeMonthData();
  }, [isCurr]);

  useEffect(() => {
    const computeAction = async () => {
      const offsettedGoal =
        Number(avgBalance) + Number(savingGoal) - Number(endBalance);
      if (!isNaN(offsettedGoal)) {
        setOffsettedGoal(offsettedGoal);
        if (user) {
          const userDocRef = doc(db, "users", user);
          const userData = (await getDoc(userDocRef)).data();
          await setDoc(userDocRef, {
            endBalance: updateField(userData?.endBalance, endBalance, isCurr),
            avgBalance: updateField(userData?.avgBalance, avgBalance, isCurr),
            savingGoal: updateField(userData?.savingGoal, savingGoal, isCurr),
          });
        }
      }
    };
    computeAction();
  }, [endBalance, avgBalance, savingGoal]);

  return (
    <>
      {isLoading ? (
        <Spinner className="mt-4" animation="grow" />
      ) : (
        <>
          <InitBar
            isCurr={isCurr}
            savingGoal={savingGoal}
            setSavingGoal={setSavingGoal}
            endBalance={endBalance}
            setEndBalance={setEndBalance}
            avgBalance={avgBalance}
            setAvgBalance={setAvgBalance}
          />

          <Table striped bordered hover size="sm" className="mt-3">
            <TableHeader isCurr={isCurr} />
            <TableBody
              user={user}
              isCurr={isCurr}
              offsettedGoal={offsettedGoal}
              monthTransaction={monthTransaction}
              setMonthTransaction={setMonthTransaction}
            />
            <TableFooter
              isCurr={isCurr}
              lastEndBalance={Number(endBalance)}
              lastAvgBalance={Number(avgBalance)}
              monthTransaction={monthTransaction}
            />
          </Table>
        </>
      )}
      {user && !isLoading && (
        <Button variant="dark" onClick={() => setIsCurr(isCurr ^ 1)}>
          {isCurr ? "<- Prev" : "Next ->"}
        </Button>
      )}
    </>
  );
}
