import Image from 'next/image'
import styles from './page.module.css'
import SDKContainer from './SDKContainer'
import { SubmitData } from './SubmitData'

export default function Home() {
  return (
    <main className={styles.main}>
      <SubmitData />
      {/* <SDKContainer></SDKContainer> */}
    </main>
  )
}
