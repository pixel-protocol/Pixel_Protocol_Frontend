import React from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import Image from "next/image"
import styled from 'styled-components'

const Logo = styled(Image)`
@media (max-width: 480px) {
    height: 38px;
    width: 38px;
}
`

const LogoContainer = styled.div`
width: 70px;
height:70px;
filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5));
border: 2px solid white !important;

@media (max-width: 480px) {
  width: 42px;
  height: 42px;
}
`

const Header = () => {
  return (
    <>
      <div id='brandLogo' className="fixed p-4 h-0">
        <LogoContainer style={{ cursor: "pointer" }} onClick={() => window.location.href = '/about'}>
          <Logo src="/images/pixellogo.png" alt="logo" width="66" height="66" />

        </LogoContainer>
      </div >
      <div id='connectButton' className="fixed right-0 p-4 h-0">

        <ConnectButton />
      </div>

    </>

  )
}

export default Header;