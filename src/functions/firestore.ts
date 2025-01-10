import { collection, doc, DocumentReference, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { maxDaysInMonth, month, now, year } from "./date";
import { sortTransactions } from "./transactions";

export async function initFirestore(userDocRef: DocumentReference, endBalance: string, avgBalance: string, savingGoal: string, monthTransaction:number[][]) {
    await setDoc(userDocRef, { 
        endBalance: ["0", endBalance], 
        avgBalance: ["0", avgBalance], 
        savingGoal: ["500", savingGoal],
        lastLoginDate: now
    });
    const transactionsDocRef = collection(userDocRef, "transactions");
    monthTransaction.forEach((transactions: number[], day: number) => {
        const dayDocRef = doc(transactionsDocRef, `day ${day + 1}`);
        setDoc(dayDocRef, { curr: transactions, prev: [] });
    });
}

export async function updateFirestore(user: string | null, updatedTransaction: number[][], index: number, isCurr: number) {
    if (user) {
        const userDocRef = doc(db, "users", user); // collection
        const transactionsDocRef = collection(userDocRef, "transactions");
        const dayDocRef = doc(transactionsDocRef, `day ${index + 1}`);
        if (isCurr) {
            await updateDoc(dayDocRef, { curr: updatedTransaction[index]});
        } else {
            await updateDoc(dayDocRef, { prev: updatedTransaction[index] });
        }
    }
}

export async function updateFirestoreIfMonthPassed(lastLoginDate: Date, userDocRef: DocumentReference) {
    await updateDoc(userDocRef, { lastLoginDate: now });
    if (lastLoginDate.getMonth() === month && lastLoginDate.getFullYear() === year) { // same month
        return;
    }
    const prevMonth = (month === 0)? 11 : month - 1;
    const prevYear = (month === 0)? year - 1 : year;
    const transactionsDocRef = collection(userDocRef, "transactions");
    const monthTransaction = await sortTransactions(userDocRef, 1);
    const userData = (await getDoc(userDocRef)).data();
    if (lastLoginDate.getMonth() === prevMonth && lastLoginDate.getFullYear() === prevYear) { // one month passed
        await updateDoc(userDocRef, {
            endBalance: [userData?.endBalance[1], "0"],
            avgBalance: [userData?.avgBalance[1], "0"],
            savingGoal: [userData?.savingGoal[1], "500"],
        });
        monthTransaction.forEach((transactions: number[], day: number) => {
            const dayDocRef = doc(transactionsDocRef, `day ${day + 1}`);
            setDoc(dayDocRef, { curr: [], prev: transactions });
        });
    } else { // more than one month passed
        await updateDoc(userDocRef, { 
            endBalance: ["0", "0"], 
            avgBalance: ["0", "0"], 
            savingGoal: [userData?.savingGoal[1], userData?.savingGoal[1]],
        });
        for (let day = 0; day < maxDaysInMonth; day++) {
            const dayDocRef = doc(transactionsDocRef, `day ${day + 1}`);
            setDoc(dayDocRef, { curr: [], prev: [] });
        }
        }
}