import { HStack, LinkProps, Text } from '@chakra-ui/react';
import Link from '~/components/Link';
import { useForceUpdate } from '~/hooks';
import paths from '~/pages/paths';
import { useAuthContext } from '~/utils/AuthProvide';

const NavigationBar = () => {
  const { isAuth, subscriptions } = useAuthContext();
  const forceUpdate = useForceUpdate();

  subscriptions.useSubscribe('change-auth', forceUpdate);

  return (
    <HStack spacing="60px">
      <NavLink href={paths.main.makePath()} children="О нас" />
      <NavLink
        isDisabled={!isAuth.get}
        href={paths.deals.makePath()}
        children="Журнал сделок"
      />
      <NavLink
        isDisabled={!isAuth.get}
        href={paths.stats.makePath()}
        children="Визуализация статистики"
      />
      <NavLink
        isDisabled={!isAuth.get}
        href={paths.recommendations.makePath()}
        children="Рекомендации"
      />
    </HStack>
  );
};

type NavLinkProps = {
  isDisabled?: boolean;
} & LinkProps;

const NavLink = ({ isDisabled, children, ...props }: NavLinkProps) => {
  if (isDisabled) {
    return (
      <Text
        color="black"
        fontWeight="600"
        fontSize="18px"
        cursor="default"
        opacity={0.6}
        children={children}
      />
    );
  }

  return (
    <Link
      {...props}
      color="black"
      fontWeight="600"
      fontSize="18px"
      borderRadius={2}
      children={children}
    />
  );
};

export default NavigationBar;
