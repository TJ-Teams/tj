import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children?: ReactNode;
};

const PageLayout = ({ children }: Props) => (
  <Flex as="main" minH="100vh" flexDir="column">
    <Header h="74px" />
    <Flex
      mt="74px"
      pos="relative"
      flex={1}
      flexDir="column"
      children={children}
    />
    {/* <Footer mt={6} mb={3} /> */}
  </Flex>
);

export default PageLayout;
