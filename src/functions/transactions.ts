import { collection, doc, DocumentData, DocumentReference, getDocs, setDoc } from "firebase/firestore";
import { daysInMonth } from "./date";
import { db } from "../firebase/config";

const emptyTransactions: number[][] = [];
for (let i = 0; i < daysInMonth; i++) {
    emptyTransactions.push([]);
}
export default emptyTransactions;

export async function sortTransactions(userDocRef: DocumentReference) {
    const transactionsDocRef = collection(userDocRef, "transactions");
    const transactionsDocsSnap = await getDocs(transactionsDocRef);
    const sortedDocs = transactionsDocsSnap.docs.sort((a: DocumentData, b: DocumentData) => {
        const dayA = parseInt(a.id.split(" ")[1], 10); // Extract day number
        const dayB = parseInt(b.id.split(" ")[1], 10);
        return dayA - dayB; // Numeric comparison
    });
    const transactions = sortedDocs.map((doc: DocumentData) => doc.data().curr); // Push in sorted order
    return transactions;
}

export async function setFirestore(userDocRef: DocumentReference, endBalance: string, avgBalance: string, savingGoal: string, monthTransaction:number[][]) {
    await setDoc(userDocRef, { endBalance: endBalance, avgBalance: avgBalance, savingGoal: savingGoal });
    const transactionsDocRef = collection(userDocRef, "transactions");
    monthTransaction.forEach((transactions: number[], day: number) => {
    const dayDocRef = doc(transactionsDocRef, `day ${day + 1}`);
    setDoc(dayDocRef, { curr: transactions });
    });
}

export async function updateFirestore(user: string | null, updatedTransaction: number[][], index: number) {
    if (user) {
        const userDocRef = doc(db, "users", user); // collection
        const transactionsDocRef = collection(userDocRef, "transactions");
        const dayDocRef = doc(transactionsDocRef, `day ${index + 1}`);
        setDoc(dayDocRef, { curr: updatedTransaction[index] });
        console.log(updatedTransaction[index]);
    }
}