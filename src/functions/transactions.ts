import { collection, DocumentData, DocumentReference, getDocs } from "firebase/firestore";

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

export function updateField(field: number[], newValue: string, isCurr: number) {
    const [prev, curr] = field;
    return isCurr ? [prev, Number(newValue)] : [Number(newValue), curr];
};