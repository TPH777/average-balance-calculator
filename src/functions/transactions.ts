import { DocumentData } from "firebase/firestore";

export function sortTransactions(transactionsDocsSnap: DocumentData) {
    const sortedDocs = transactionsDocsSnap.docs.sort((a: DocumentData, b: DocumentData) => {
        const dayA = parseInt(a.id.split(" ")[1], 10); // Extract day number
        const dayB = parseInt(b.id.split(" ")[1], 10);
        return dayA - dayB; // Numeric comparison
    });
    return sortedDocs;
}
