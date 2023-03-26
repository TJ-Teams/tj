import { Box, Button, Flex } from '@chakra-ui/react';
import AddDealButton from './AddDealButton';
import AddParameterButton from './AddParameterButton';
import DealsTable from './DealsTable';

const DealsPage = () => {
  return (
    <Flex flex={1} justify="center">
      <Flex h="calc(100vh - 74px)" flexDir="column" overflow="clip">
        <Flex flexDir="row" overflow="clip">
          <DealsTable />
          <AddParameterButton />
        </Flex>
        <AddDealButton />
      </Flex>
    </Flex>
  );
};

export default DealsPage;
