import { Flex, FlexProps } from '@chakra-ui/react';
import AuthButton from './AuthButton';
import Logo from './Logo';
import NavigationBar from './NavigationBar';

const Header = (props: FlexProps) => (
  <Flex
    {...props}
    px={10}
    w="full"
    pos="fixed"
    top={0}
    bg="white"
    borderBottom="2px solid rgba(160, 173, 198, 0.5)"
    align="center"
    justify="space-between"
    zIndex="banner"
  >
    <Logo />
    <NavigationBar />
    <AuthButton />
  </Flex>
);

export default Header;
