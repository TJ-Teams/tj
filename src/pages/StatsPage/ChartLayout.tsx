import { Box, Heading } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { ResponsiveContainer } from 'recharts';

type Props = {
  title: string;
  children: ReactElement;
};

const ChartLayout = ({ title, children }: Props) => (
  <Box
    p="12px 48px 48px 16px"
    boxSize="full"
    border="2px solid #F0F2F4"
    borderRadius={8}
  >
    <Heading mb={4} fontSize="20px" textAlign="center" children={title} />
    <ResponsiveContainer width="100%" height="100%" children={children} />
  </Box>
);

export default ChartLayout;
