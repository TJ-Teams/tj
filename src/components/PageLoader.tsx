import { Center } from '@chakra-ui/react';
import HashLoader from 'react-spinners/HashLoader';

const PageLoader = () => (
  <Center flex={1}>
    <HashLoader size={65} color="#0044CB" />
  </Center>
);

export default PageLoader;
