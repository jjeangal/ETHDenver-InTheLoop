"use client";

import Image from 'next/image'
import styles from './page.module.css'
// import SDKContainer from './SDKContainer'
// import { SubmitData } from './SubmitData'
import { Button } from '@chakra-ui/react'
import { useMetaMask } from '../hooks/useMetaMask'
import { reviewContract } from './assets/reviewContract'
import { ethers } from 'ethers';

export default function Home() {  
  const { wallet, sdkConnected, setError } = useMetaMask();

  const submitData = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    if (wallet.accounts.length > 0) {
      const review = new ethers.Contract(
        reviewContract.address,
        reviewContract.abi,
        signer
      );
      const requestReviewed = await review.requiredReviews();
      console.log(`${requestReviewed} reviews are required`);

    }
  }
  return (
    <main className={styles.main}>
      <Button onClick={submitData}>Submit button</Button>
      {/* <SubmitData /> */}
      {/* <SDKContainer></SDKContainer> */}
    </main>
  )
}
