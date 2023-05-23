import React from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import Image from "next/image"
import styled from 'styled-components'

const Logo = styled(Image)`
@media (max-width: 480px) {
    height: 36px;
    width: 36px;
}
`

const LogoContainer = styled.div`
width: 70px;
height:70px;
filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5));
border: 3px solid white !important;

@media (max-width: 480px) {
  width: 42px;
  height: 42px;
}
`

const Header = () => {
  return (
    <>
      <div id='brandLogo' className="fixed p-4 h-0">
        <LogoContainer onClick={() => window.location.href = '/'}>
          <Logo src="/images/pixellogo.png" alt="logo" width="64" height="64" />

        </LogoContainer>
      </div >
      <div id='connectButton' className="fixed right-0 p-4 h-0">

        <ConnectButton />
      </div>

    </>

  )
}

export default Header;