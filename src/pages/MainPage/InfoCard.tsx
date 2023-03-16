import { HStack, Image, Text } from '@chakra-ui/react';

type Props = {
  imageSrc: string;
  text: string;
};

const InfoCard = ({ imageSrc, text }: Props) => (
  <HStack
    p="28px"
    w="460px"
    spacing="36px"
    borderRadius={30}
    boxShadow="0px 0px 20px rgba(0, 0, 0, 0.18)"
  >
    <Image boxSize="116px" pointerEvents="none" src={imageSrc} />
    <Text
      fontSize="22px"
      fontWeight="600"
      lineHeight="27px"
      whiteSpace="pre-line"
      children={text}
    />
  </HStack>
);

export default InfoCard;
