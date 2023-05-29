import { Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  imageSrc: string;
  title: string;
  text: string | ReactNode;
};

const InfoCard = ({ imageSrc, title, text }: Props) => (
  <Stack
    p={{ base: '16px', md: '22px', xl: '28px' }}
    spacing={{ base: '20px', xl: '40px' }}
    borderRadius={{ base: 15, xl: 30 }}
    boxShadow="0px 0px 20px rgba(0, 0, 0, 0.18)"
    align={{ base: 'center', xl: 'flex-start' }}
    direction={{ base: 'column', xl: 'row' }}
  >
    <Image
      w="450px"
      maxH="305px"
      pointerEvents="none"
      border="1.5px solid #E6E6E6"
      objectFit="contain"
      borderRadius={8}
      src={imageSrc}
    />
    <Stack spacing={{ base: '8px', xl: '32px' }}>
      <Heading
        fontSize={{ base: '18px', md: '28px', xl: '36px' }}
        fontWeight="600"
        children={title}
      />
      <Text
        fontSize={{ base: '12px', md: '18px', xl: '24px' }}
        fontWeight="500"
        children={text}
      />
    </Stack>
  </Stack>
);

export default InfoCard;
