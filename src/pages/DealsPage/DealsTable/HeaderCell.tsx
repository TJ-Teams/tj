import { Center, FlexProps } from '@chakra-ui/react';

type Props = {
  name: string;
} & FlexProps;

const HeaderCell = ({ name, ...props }: Props) => (
  <Center
    pos="sticky"
    top={0}
    px={4}
    minW="max-content"
    h="55px"
    maxH="55px"
    color="black"
    bg="#F3E4FF"
    fontSize="14px"
    fontWeight="600"
    borderBottom="1px solid #b9b9b9"
    children={name}
    {...props}
  />
);

export default HeaderCell;
