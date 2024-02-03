"use client";
import { useEffect, useState } from "react";
import React from "react";
import { contractABI, contractAddress } from '../lib/constant'
import { ethers } from 'ethers'

export const TransactionContext = React.createContext();

let eth;

if (typeof window !== 'undefined') {
    eth = window.ethereum
}

const getEthereumContract = () => {
    const provider = new ethers.BrowserProvider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer,
    )
  
    return transactionContract
  }

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: ''
    })

    useEffect(() => {
        checkIfWalletIsConnected()
    },[])

    const connectWallet = async (metamask = eth) => {
        try {
            if(!metamask) return alert("Please install metamask!")
            const accounts = await metamask.request({method: 'eth_requestAccounts'})
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.error(error)
            throw new Error('No ethereum object')
        }
    } 

    const checkIfWalletIsConnected = async ( metamask = eth ) => {
        try {
            if(!metamask) return alert('Please install metamask.')

            const accounts = await metamask.request({method: 'eth_requestAccounts'})
            if(accounts.length) {
                setCurrentAccount(accounts[0])
            }
        } catch (error) {
            console.error(error)
            throw new Error('No ethereum object')
        }
    }

    const saveTransaction = async (
        txHash,
        amount,
        fromAddress = currentAccount,
        toAddress
    ) => {
        const txDoc = {
            _type: 'transactions',
            _id: txHash,
            fromAddress: fromAddress,
            toAddress: toAddress,
            timeStamp: new Date(Date.now()).toISOString(),
            txHash: txHash,
            amount: parseFloat(amount)
        }

        await client.create(txDoc)
        await client
            .patch(currentAccount)
            .setIfMissing({ transactions: [] })
            .insert('after', 'transactions[-1]', [
                {
                    _key: txHash,
                    _ref: txHash,
                    _type: 'reference',
                },
            ])
            .commit()

        return
    }

    const sendTransaction = async (
        metamask = eth,
        connectedAccount = currentAccount
    ) => {
        try {
            if(!metamask) return alert('Please install metamask')
            const { addressTo, amount } = formData
            const TransactionContract = getEthereumContract()

            const parsedAmount = ethers.parseEther(amount)
            console.log(parsedAmount)

            await metamask.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: connectedAccount,
                        to: addressTo,
                        gas: '0x7ef40',
                        value: parsedAmount.toString(16),
                    }
                ]
            })

            const transactionHash = await TransactionContract.publishTransaction(
                addressTo,
                parsedAmount,
                `Transferring ETH ${parsedAmount} to ${addressTo}`,
                'TRANSFER',
            )

            setIsLoading(true)

            await transactionHash.wait()

            await saveTransaction(
                transactionHash,
                amount,
                connectedAccount,
                addressTo
            )

            setIsLoading(false)
        }  catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}))
    }

    return (
        <TransactionContext.Provider
            value = {{
                currentAccount,
                connectWallet,
                sendTransaction,
                handleChange,
                formData,
            }} 
        >
            {children}
        </TransactionContext.Provider>
    )
}