import { Flex, Spacer } from '@chakra-ui/react';
import { memo } from 'react';
import { AddRowsComponentProps } from 'react-datasheet-grid';
import AddDealButton from './AddDealButton';
import ImportDealsButton from './ImportDealsButton';
import SaveIndicator from './SaveIndicator';

const BottomBar = ({ addRows }: AddRowsComponentProps) => (
  <Flex px={4} align="center">
    <AddDealButton onAdd={() => addRows()} />
    <ImportDealsButton />
    <Spacer />
    <SaveIndicator />
  </Flex>
);

export default memo(BottomBar);
