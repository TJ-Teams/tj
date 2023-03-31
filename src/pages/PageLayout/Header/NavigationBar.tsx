import { HStack, LinkProps } from '@chakra-ui/react';
import Link from '~/components/Link';
import paths from '~/pages/paths';

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
    <NavLink href={paths.main.makePath()} children="О нас" />
    <NavLink href={paths.deals.makePath()} children="Журнал сделок" />
    <NavLink href="/" children="Визуализация статистики" />
    <NavLink href="/" children="Рекомендации" />
  </HStack>
);

export default NavigationBar;
