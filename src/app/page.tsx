'use client';

import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

export default function Home() {

  const { isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main >
      <div>
        {/* <Link href="/uploadsong">Upload A Song</Link> */}
        <p>Get started</p>
      </div>
    </main>
  );
}
