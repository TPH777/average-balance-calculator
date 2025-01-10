import { collection, doc, DocumentData, DocumentReference, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export function emptyTransactions(days: number) {
    const arr: number[][] = [];
    for (let i = 0; i < days; i++) {
        arr.push([]);
    }
    return arr;
}

export async function sortTransactions(userDocRef: DocumentReference, isCurr: number): Promise<number[][]> {
    const transactionsDocRef = collection(userDocRef, "transactions");
    const transactionsDocsSnap = await getDocs(transactionsDocRef);
    const sortedDocs = transactionsDocsSnap.docs.sort((a: DocumentData, b: DocumentData) => {
        const dayA = parseInt(a.id.split(" ")[1], 10); // Extract day number
        const dayB = parseInt(b.id.split(" ")[1], 10);
        return dayA - dayB; // Numeric comparison
    });
    const transactions = sortedDocs.map((doc: DocumentData) => {
        const data = doc.data();
        return isCurr ? data.curr : data.prev; // Return either curr or prev based on isCurr
    });
    return transactions;
}

export async function initFirestore(userDocRef: DocumentReference, endBalance: string, avgBalance: string, savingGoal: string, monthTransaction:number[][]) {
    await setDoc(userDocRef, { 
        endBalance: ["0", endBalance], 
        avgBalance: ["0", avgBalance], 
        savingGoal: ["500", savingGoal] 
    });
    const transactionsDocRef = collection(userDocRef, "transactions");
    monthTransaction.forEach((transactions: number[], day: number) => {
        const dayDocRef = doc(transactionsDocRef, `day ${day + 1}`);
        setDoc(dayDocRef, { curr: transactions, prev: [] });
    });
}

export function updateField(field: number[], newValue: string, isCurr: number) {
    const [prev, curr] = field;
    return isCurr ? [prev, Number(newValue)] : [Number(newValue), curr];
};

export async function updateFirestore(user: string | null, updatedTransaction: number[][], index: number, isCurr: number) {
    if (user) {
        const userDocRef = doc(db, "users", user); // collection
        const transactionsDocRef = collection(userDocRef, "transactions");
        const dayDocRef = doc(transactionsDocRef, `day ${index + 1}`);
        if (isCurr) {
            await updateDoc(dayDocRef, {
               curr: updatedTransaction[index]
            });
        } else {
            await updateDoc(dayDocRef, {
                prev: updatedTransaction[index]
             });
        }
    }
}