import styles from './Navigation.module.css'
import { SiEthereum } from 'react-icons/si'

import { formatAddress, formatChainAsNum } from '~/utils'
import { isSupportedNetwork } from '~/lib/isSupportedNetwork'

import SwitchNetwork from '~/components/SwitchNetwork/SwitchNetwork'
import { useMetaMask } from '~/hooks/useMetaMask'
import { useDappConfig } from '~/hooks/useDappConfig'

export const Navigation = () => {
  const { wallet, isConnecting, connectMetaMask, sdk, sdkConnected } =
    useMetaMask()
  const walletChainSupported = isSupportedNetwork(wallet.chainId)
  const { dapp } = useDappConfig()

  return (
    <div className={styles.navigation}>
      <div className={styles.flexContainer}>
        <div className={styles.leftNav}>
          <SiEthereum /> ETH Atlantis
        </div>
        <div className={styles.rightNav}>
          {wallet.accounts.length < 1 && (
            <button onClick={connectMetaMask}>Connect MetaMask</button>
          )}
          <>
            {wallet.accounts.length > 0 && (
              <div className={styles.tag}>
                {sdk.isExtensionActive() ? 'EXTENSION' : 'MOBILE'}
              </div>
            )}
            {wallet.accounts.length > 0 &&
              !isSupportedNetwork(wallet.chainId) && <SwitchNetwork />}
            {wallet && wallet.accounts.length > 0 && (
              <>
                {/* <button onClick={async () => sdk.terminate()}>
                  Terminate
                </button> */}
                {walletChainSupported && dapp.chainInfo?.contractAddress !== "" ? 
                  <a href={`${dapp.chainInfo?.blockExplorer}/address/${dapp.chainInfo?.contractAddress}`}
                    target="_blank" title="Open in Block Explorer"
                  >
                    {dapp.chainInfo.name}:{formatChainAsNum(wallet.chainId)}
                  </a>
                : <>{dapp.chainInfo.name}:{formatChainAsNum(wallet.chainId)}</>
                }
                &nbsp;|&nbsp;
                <a
                  href={`https://etherscan.io/address/${wallet}`}
                  target="_blank"
                  title="Open in Block Explorer"
                >
                  {formatAddress(wallet.address)}
                </a>
                <div className={styles.balance}>{wallet.balance} ETH</div>
                <div>
                  <button onClick={() => sdk.terminate()}>DISCONNECT</button>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </div>
  )
}
