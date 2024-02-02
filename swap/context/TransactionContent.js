import { useEffect, useState } from "react";

export const TransactionContext = React.createContext();

let eth;

if (typeof window !== 'undefined') {
    eth = window.ethereum
}