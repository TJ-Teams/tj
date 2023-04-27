import {
  Button,
  Center,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { useState } from 'react';
import Dropzone from '~/components/Dropzone';
import Window, { WindowProps } from '~/components/Window';
import { Deal, Parameter } from '~/types/deals';
import importTinkoffDeals from '~/utils/import-tinkoff-deals';
import importTjDeals from '~/utils/import-tj-deals';
import importInteractiveDeals from '~/utils/import-interactive-deals';
import { useDealsContext } from '../deals-context';

enum ProviderType {
  Tinkoff,
  InteractiveBrokers,
  TradersJournal,
}

type Provider = {
  type: ProviderType;
  name: string;
  imageSrc: string;
  acceptFiles: Record<string, string[]>;
  importDeals: (file: File) => Promise<[Parameter[], Deal[]]>;
};

const ImportDealsWindow = ({ isOpen, onClose }: WindowProps) => {
  const { parameters, deals, subscriptions } = useDealsContext();

  const [type, setType] = useState<ProviderType | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const [error, setError] = useBoolean(false);

  const isHideCancel = (type === undefined || file !== undefined) && !error;

  const reset = () => {
    setType(undefined);
    setFile(undefined);
    setError.off();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleDrop = async (files: File[]) => {
    const file = files.at(0);
    if (!file || type === undefined) return;
    setFile(file);

    try {
      const [newParameters, newDeals] = await providers[type].importDeals(file);
      parameters.set(mergeParameters(parameters.get, newParameters));
      deals.set([...deals.get, ...newDeals]);
      handleClose();
      subscriptions.ping('table');
    } catch (err) {
      console.warn('Invalid import', err);
      setError.on();
    }
  };

  return (
    <Window
      isOpen={isOpen}
      onClose={handleClose}
      heading="Импортировать журнал сделок"
      isHideSubmit
      isHideCancel={isHideCancel}
      cancelProps={{
        onClick: reset,
        children: 'Назад',
      }}
      w="700px"
      h="500px"
    >
      {type === undefined ? (
        <HStack pb={20} h="full" justify="center" spacing={4}>
          {Object.values(providers).map((p, i) => (
            <ProviderButton
              key={i}
              name={p.name}
              imageSrc={p.imageSrc}
              onClick={() => setType(p.type)}
            />
          ))}
        </HStack>
      ) : !file ? (
        <Dropzone
          boxSize="full"
          accept={providers[type].acceptFiles}
          onDrop={handleDrop}
        />
      ) : !error ? (
        <Center pb={20} boxSize="full" flexDir="column">
          <Text mb={4} fontSize="20px" children="Идёт импортирование..." />
          <Spinner color="primary.2" />
        </Center>
      ) : (
        <Center pb={16} boxSize="full" flexDir="column">
          <Text
            color="red.500"
            mb={4}
            fontSize="20px"
            fontWeight="bold"
            children="Ошибка импортирования"
          />
          <Text fontSize="16px" children="Некорректный синтаксис файла" />
        </Center>
      )}
    </Window>
  );
};

type ProviderButtonProps = {
  imageSrc: string;
  name: string;
  onClick?: () => void;
};

const ProviderButton = ({ imageSrc, name, onClick }: ProviderButtonProps) => (
  <Stack
    p={4}
    border="2px solid"
    borderRadius={8}
    borderColor="transparent"
    cursor="pointer"
    _hover={{ borderColor: 'gray.300' }}
    transitionProperty="border-color"
    transitionDuration="fast"
    onClick={onClick}
  >
    <Image
      boxSize="150px"
      objectFit="contain"
      pointerEvents="none"
      src={imageSrc}
      alt={name}
    />
    <Button
      w="full"
      variant="clear"
      borderRadius={4}
      onClick={onClick}
      children={name}
    />
  </Stack>
);

const providers: Record<ProviderType, Provider> = {
  [ProviderType.Tinkoff]: {
    type: ProviderType.Tinkoff,
    name: 'Tinkoff',
    imageSrc: '/images/tinkoff.png',
    acceptFiles: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
    },
    importDeals: importTinkoffDeals,
  },
  [ProviderType.InteractiveBrokers]: {
    type: ProviderType.InteractiveBrokers,
    name: 'Interactive Brokers',
    imageSrc: '/images/interactive-brokers.png',
    acceptFiles: { 'text/csv': ['.csv'] },
    importDeals: importInteractiveDeals,
  },
  [ProviderType.TradersJournal]: {
    type: ProviderType.TradersJournal,
    name: 'Traders Journal',
    imageSrc: '/favicon.svg',
    acceptFiles: { 'text/csv': ['.csv'] },
    importDeals: importTjDeals,
  },
};

const mergeParameters = (
  oldParams: Parameter[],
  newParams: Parameter[]
): Parameter[] => {
  const parametersMap = new Map(oldParams.map((p) => [p.key, p]));
  newParams.forEach((p) => {
    if (parametersMap.has(p.key)) return;
    parametersMap.set(p.key, p);
  });
  return [...parametersMap.values()];
};

export default ImportDealsWindow;
