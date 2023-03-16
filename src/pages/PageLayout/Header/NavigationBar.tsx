import { HStack, LinkProps } from '@chakra-ui/react';
import Link from '~/components/Link';

const NavLink = (props: LinkProps) => (
  <Link
    {...props}
    color="black"
    fontWeight="600"
    fontSize="18px"
    borderRadius={2}
  />
);

const NavigationBar = () => (
  <HStack spacing="60px">
    <NavLink href="/" children="О нас" />
    <NavLink href="/" children="Журнал сделок" />
    <NavLink href="/" children="Визуализация статистики" />
    <NavLink href="/" children="Рекомендации" />
  </HStack>
);

export default NavigationBar;
