import { Flex } from '@chakra-ui/react';
import AddParameterButton from './AddParameterButton';
import BottomBar from './BottomBar';
import DealsTable from './DealsTable';
import { DealsProvider } from './deals-context';

const DealsPage = () => (
  <DealsProvider>
    <Flex flex={1} justify="center">
      <Flex h="calc(100vh - 74px)" flexDir="column" overflow="clip">
        <Flex flexDir="row" overflow="clip">
          <DealsTable />
          <AddParameterButton />
        </Flex>
        <BottomBar />
      </Flex>
    </Flex>
  </DealsProvider>
);

export default DealsPage;
