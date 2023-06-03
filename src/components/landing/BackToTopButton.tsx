import { Box, Button, Icon } from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [bottom, setBottom] = useState(4)

  const handleScroll = () => {
    const reverse = document.documentElement.scrollHeight - window.innerHeight - window.pageYOffset;
    const footerElement = document.querySelector("footer");
    if (reverse < 0) console.log(reverse)
    if (footerElement) {
      const height = footerElement.offsetHeight;
      if (reverse < height) { setBottom(height - reverse) }
    }

    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {showButton && (
        <Button
          position="fixed"
          bottom={bottom}
          right={4}
          size="sm"
          onClick={scrollToTop}
          colorScheme='purple'
          borderRadius='full'
        >
          <Icon as={FaArrowUp} boxSize={4} />
        </Button>
      )}
    </>
  );
};

export default BackToTopButton;