import type { NextPage } from 'next'
import Image from 'next/image'
import styled from 'styled-components'

const Landing: NextPage = () => {
  return (<Container>
    <Header />
    <About />
    <Contact />
  </Container>);
}

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderBar>
        <AppButton href="/app">Go to app</AppButton>
      </HeaderBar>
      <ContentContainer>
        <Image src="/images/logo.png" alt='pixelprotocol' height="200" width="200" />
        <TextContainer>
          <Headline>
            Pixel Protocol
          </Headline>
          <SubHeadline>
            A free and open <TextAccent>pixel-based</TextAccent> forum for everyone.
          </SubHeadline>
          <PrimaryButton href='/app'>
            Launch Web3 App
          </PrimaryButton>
        </TextContainer>
      </ContentContainer>
    </HeaderContainer>
  )
}

const About = () => {
  return (
    <AboutContainer>
      <AboutText>
        Pixel Protocol is a decentralized application where users mint Pixels on a 1000 x 1000 public canvas as a form of expression, record-taking, and public discourse. Individual pixels are represented by Non-Fungible Tokens (NFTs) on the blockchain which adhere to the ERC721 standard.
        Pixel Protocol comprises two main components, the NFT component and the Lottery component.
        <br></br><br></br>
        <AboutSubtitle>Non-fungible Token</AboutSubtitle>
        When users mint a Pixel, they are claiming ownership of a pixel at a particular coordinate on the canvas. The fee for minting is determined by the underlying pixel's coordinates on the canvas, which in turn determines how strategically located the pixel is. Pixels at the center of the canvas would be significantly more expensive than those at the corners.
        After calling the mint function with the desired color as input, the Pixel at that coordinate now belongs to them. The underlying pixel is now reflected on the canvas, and should they wish to, they can mint more Pixels and gradually increase their presence on the public canvas. There are no restrictions on what can be created on the canvas. They can use the Pixels to advertize, spread a message, or simply let their creative juices flow. After all, it is a decentralized application.
        <br></br><br></br>
        <AboutSubtitle>Lottery</AboutSubtitle>
        Users can stake their Pixels in the Lottery contract for other players to bid for their Pixels. When players bid for a pixel, they can choose whether or not to override the current color. Either way, they gain ownership of the Pixel if they win the game. However, if they were to lose, they incur no losses beyond the lottery fee.
        The outcome of the game is determined using Chainlink VRF, which allows blockchain-based applications to request for random numbers on-chain. In order to win, the random number generated for each round must fulfill certain criteria specified in the smart contract. Once the bid is successful, the Pixel will be transferred to the bidder. In other words, the original staker loses ownership of their Pixel.
        Considering that they risk losing ownership of their Pixels, the system is designed such that the chances of winning is low and the rewards are lucrative enough for users to be incentivized to stake their Pixels. Currently, the lottery fee is pegged to the minting fee of the pixel and most of it is transferred to the staker. In other words, 10 rounds of unsuccessful bidding provides the staker an ROI of 1000%.
        The Lottery component brings gamification to the Dapp. It provides an opportunity for bidders to claim ownership and override the content of a Pixel at the desired coordinates and a source of passive income for stakers.
      </AboutText>
    </AboutContainer>
  )
}

const Contact = () => {
  return (
    <ContactContainer>
      <ContactHeader>

      </ContactHeader>
      <ContactText>
        Questions? Contact the team at <ContactLink href="mailto:pixelprotocolweb3@gmail.com">pixelprotocolweb3@gmail.com</ContactLink>
      </ContactText>
    </ContactContainer>
  )
}

const Container = styled.div`
height: 100vh;
overflow: scroll;
`

const HeaderContainer = styled.div`
height: 70%;
background-color: rgba(0, 0, 0, 0.8);
padding-top: 1rem;
@media screen and (max-width: 768px) {
    height: fit-content;
    padding-bottom: 2rem;
}
`

const Logo = styled(Image)`
@media screen and (max-width: 768px) {
    height: 150px;
    width: 150px;
}
`

const ContentContainer = styled.div`
height: 100%;
display: flex;
align-content: center;
padding: 2rem;
padding-top: 8rem;
@media screen and (max-width: 768px) {
    flex-direction: column;
    padding-top: 3rem;
}
`

const TextContainer = styled.div`
padding-left: 2rem;
@media screen and (max-width: 768px) {
    padding-left: 0;
    padding-top: 1rem;
}
`


const Headline = styled.h1`
font-weight: bold;
font-size: 4em;
color: rgba(255, 255, 255, 0.8);
@media screen and (max-width: 768px) {
    font-size: 3em;
}
`
const SubHeadline = styled.h2`
color: rgba(255, 255, 255, 0.7);
font-size: 1.4em;
margin-bottom: 2rem;
`

const HeaderBar = styled.div`
position: relative;
height: 4.5rem;
margin: 0rem 1rem;
background-color: rgba(255, 255, 255, 0.05);
border-radius: 10px
`

const TextAccent = styled.span`
color: rgba(243, 170, 3, 1)
`

const AppButton = styled.a`
position: absolute;
right: 1rem;
top: 1rem;
border-radius: 10px;
border: 2px solid rgba(255, 255, 255, 0.8);
padding: 0.3rem 0.6rem;
color: rgba(255, 255, 255, 0.8)
`

const PrimaryButton = styled.a`
margin-top: 1.5rem;
border-radius: 10px;
border: 2px solid rgba(255, 255, 255, 0.7);
padding: 0.45rem 0.9rem;
font-size: 1em;
font-weight: bold;
color: rgba(255, 255, 255, 0.8)
`

const AboutContainer = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 4rem 0;
@media screen and (max-width: 768px) {
    padding: 2rem 0;
}
`

const AboutText = styled.div`
width: 60%;
@media screen and (max-width: 768px) {
    width: 80%;
}
`

const AboutSubtitle = styled.h3`
font-weight: bold;
font-size: 1em;
color: rgba(0, 0, 0, 0.9)
`

const ContactContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
height: 15%;
width: 100%;
border-top: 6px solid rgba(0, 0, 0, 0.4);
background-color: rgba(0, 0, 0, 0.01);
@media screen and (max-width: 768px) {
    margin-bottom: 2rem;
}
`
const ContactHeader = styled.h3`
`

const ContactText = styled.h3`
width: 100%;
margin-top: 0.8rem;
text-align: center;
font-weight: bold;
font-size: 1.3em;
`

const ContactLink = styled.a`
color: rgba(243, 170, 3, 1)
`

export default Landing;
