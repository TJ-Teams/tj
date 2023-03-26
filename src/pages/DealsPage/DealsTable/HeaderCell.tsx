import { Center } from '@chakra-ui/react';

type Props = {
  name: string;
};

const HeaderCell = ({ name }: Props) => (
  <Center
    px={4}
    h="55px"
    maxH="55px"
    color="black"
    bg="#F3E4FF"
    fontSize="14px"
    fontWeight="600"
    borderRight="1px solid #B9B9B9"
    borderBottom="1px solid #B9B9B9"
    children={name}
  />
);

export default HeaderCell;
