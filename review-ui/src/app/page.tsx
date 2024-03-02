"use client";

import Image from 'next/image'
import styles from './page.module.css'
// import SDKContainer from './SDKContainer'
import { SubmitData } from './SubmitData'
import { Button } from '@chakra-ui/react'
import { reviewContract } from './assets/reviewContract'
import { ethers } from 'ethers';

export default function Home() {  
  return (
    <main className={styles.main}>
      <SubmitData />
    </main>
  )
}
