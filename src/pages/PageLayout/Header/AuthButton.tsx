import { Button } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import api from '~/api';
import { useForceUpdate, useLoadingState, useMethodAfterMount } from '~/hooks';
import paths from '~/pages/paths';
import { useAuthContext } from '~/utils/AuthProvide';

const AuthButton = () => {
  const queryClient = useQueryClient();
  const { isAuth, subscriptions } = useAuthContext();
  const { isLoading, trackLoadingDiscard } = useLoadingState();
  const navigate = useNavigate();
  const forceUpdate = useForceUpdate();

  subscriptions.useSubscribe('change-auth', forceUpdate);

  useMethodAfterMount(() => api.user.getInfo(), {
    isSkip: !isAuth.get,
  });

  if (isAuth.get) {
    const onLogout = trackLoadingDiscard(async () => {
      await api.user.logout();
      isAuth.set(false);
      queryClient.clear();
      navigate(paths.login.makePath(), { replace: true });
    });

    return (
      <Button
        px={8}
        h="46px"
        fontWeight="800"
        fontSize="18px"
        borderRadius={20}
        children="Выйти"
        isLoading={isLoading}
        onClick={onLogout}
      />
    );
  }

  return (
    <Button
      px={8}
      h="46px"
      as={Link}
      to={paths.login.makePath()}
      fontWeight="800"
      fontSize="18px"
      borderRadius={20}
      children="Войти"
    />
  );
};

export default AuthButton;
