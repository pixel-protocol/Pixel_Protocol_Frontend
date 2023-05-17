import React from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import Image from "next/image"

const Header = () => {
  return (
    <>
      <div id='brandLogo' className="fixed p-4 h-0">
        <div onClick={() => window.location.href = '/'} style={{ width: 70, height: 70, filter: 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5))', border: '3px solid white !important' }}>
          <Image id="navLogo" src="/logo.png" alt="logo" width="64" height="64" />

        </div>
      </div>
      <div id='connectButton' className="fixed right-0 p-4 h-0">

        <ConnectButton />
      </div>

    </>

  )
}

export default Header;