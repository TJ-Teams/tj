import { Box, Heading, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { ResponsiveContainer } from 'recharts';

type Props = {
  title: string;
  unitName: string;
  children: ReactElement;
};

const ChartLayout = ({ title, unitName, children }: Props) => (
  <Box
    p="12px 48px 48px 16px"
    boxSize="full"
    border="2px solid #F0F2F4"
    borderRadius={8}
    pos="relative"
  >
    <Heading mb={4} fontSize="20px" textAlign="center" children={title} />
    <Text
      pos="absolute"
      left={4}
      top={3}
      fontSize="16px"
      fontWeight="600"
      children={unitName}
    />
    <ResponsiveContainer width="100%" height="100%" children={children} />
  </Box>
);

export default ChartLayout;
