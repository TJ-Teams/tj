import { HStack, Stack } from '@chakra-ui/react';
import { Fragment } from 'react';
import InfoCard from './InfoCard';
import WelcomeImage from './WelcomeImage';

const MainPage = () => (
  <Fragment>
    <WelcomeImage />
    <HStack mt="44px" justify="center" spacing="98px">
      <InfoCard
        imageSrc="/images/main-info-1.png"
        text={'Обзор сделок со всех рынков'}
      />
      <InfoCard
        imageSrc="/images/main-info-2.png"
        text={'Кастомизация статистики'}
      />
      <InfoCard
        imageSrc="/images/main-info-3.png"
        text={'Индивидуальные рекомендации на основе ваших стратегий'}
      />
    </HStack>
  </Fragment>
);

export default MainPage;
