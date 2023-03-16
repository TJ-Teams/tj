import { Box, Heading, Image, Text } from '@chakra-ui/react';

const WelcomeImage = () => (
  <Box w="full" h="fit-content" pos="relative">
    <Image
      w="full"
      h="596px"
      objectFit="cover"
      pointerEvents="none"
      src="/images/main-bg.png"
    />
    <Box
      position="absolute"
      color="white"
      left="calc(50% - 30vw)"
      top="calc(50% - 128px)"
    >
      <Heading fontSize="64px" fontWeight="700" children="Trader's Journal" />
      <Text mt="36px" fontSize="32px" whiteSpace="pre-line">
        {'твой личный журнал со\nстатистикой сделок и\nаналитикой стратегий'}
      </Text>
    </Box>
  </Box>
);

export default WelcomeImage;
