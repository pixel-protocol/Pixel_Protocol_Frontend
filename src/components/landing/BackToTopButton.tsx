import { Box, Button, Icon } from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
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
          bottom={4}
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