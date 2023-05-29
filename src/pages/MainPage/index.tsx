import { Stack } from '@chakra-ui/react';
import { Fragment } from 'react';
import InfoCard from './InfoCard';
import WelcomeImage from './WelcomeImage';

const MainPage = () => (
  <Fragment>
    <WelcomeImage />
    <Stack
      my="62px"
      mx={{ base: '5vw', xl: '10vw' }}
      justify="center"
      spacing={{ base: '20px', xl: '48px' }}
    >
      <InfoCard
        imageSrc="/images/preview-1.png"
        title="Журнал сделок"
        text={
          <>
            Занесите сделки в онлайн журнал или импортируйте таблицы от разных
            брокеров, а затем настройте таблицу по своим пожеланиям: добавьте
            новые параметры, переместите или удалите столбцы.
          </>
        }
      />
      <InfoCard
        imageSrc="/images/preview-2.png"
        title="Визуализация"
        text={
          <>
            Визуализируйте закрытые сделки с помощью удобных инструментов
            построения диаграмм. Выберите интересующий вас параметр, укажите
            период времени и визуализируйте выбранный параметр одним из типов
            диаграмм (объем, доходность параметра или точность сделок по
            параметру).
          </>
        }
      />
      <InfoCard
        imageSrc="/images/preview-3.png"
        title="Рекомендательная система"
        text={
          <>
            Рекомендательная система поможет определить параметры, при которых
            совершались ваши лучшие сделки и отследить параметры, при которых
            совершались худшие сделки.
          </>
        }
      />
    </Stack>
  </Fragment>
);

export default MainPage;
