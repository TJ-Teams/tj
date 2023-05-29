import { Box, Heading, Image, Text } from '@chakra-ui/react';

const WelcomeImage = () => (
  <Box w="full" h="fit-content" pos="relative">
    <Image
      w="full"
      h={{ base: '300px', md: '596px' }}
      objectFit="cover"
      pointerEvents="none"
      src="/images/main-bg.png"
    />
    <Box
      position="absolute"
      left={{ base: '15vw', md: 'calc(50% - 30vw)' }}
      top={{ base: '75px', md: 'calc(50% - 128px)' }}
    >
      <Heading
        color="white"
        fontSize={{ base: '28px', md: '64px' }}
        fontWeight="700"
        children="Trader's Journal"
      />
      <Text
        mt={{ base: '18px', md: '36px' }}
        color="white"
        fontSize={{ base: '18px', md: '32px' }}
        whiteSpace="pre-line"
      >
        {'твой личный журнал со\nстатистикой сделок и\nаналитикой стратегий'}
      </Text>
    </Box>
  </Box>
);

export default WelcomeImage;
