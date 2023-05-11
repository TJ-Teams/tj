import {
  Button as Button,
  ButtonProps,
  Icon,
  useBoolean,
  Wrap,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiSettings3Fill } from 'react-icons/ri';
import Window, { WindowProps } from '~/components/Window';
import { Parameter } from '~/types/deals';
import { useStatsContext } from '../stats-context';

const SettingParametersButton = () => {
  const { chosenParameterKeys, parametersMap, subscriptions } =
    useStatsContext();
  const [isOpen, setIsOpen] = useBoolean(false);

  const handleSubmit = (parameterKeys: string[]) => {
    chosenParameterKeys.set(
      parameterKeys.filter((key) => parametersMap.has(key))
    );
    subscriptions.ping('chosen-parameters');
  };

  return (
    <>
      <Button
        color="#852AD3"
        variant="empty"
        fontWeight="500"
        _hover={{ opacity: 0.75 }}
        _active={{ opacity: 0.8 }}
        onClick={setIsOpen.on}
        children="Настройка кастомизации"
        rightIcon={<Icon as={RiSettings3Fill} boxSize={6} />}
      />
      <SettingParametersWindow
        isOpen={isOpen}
        onClose={setIsOpen.off}
        defaultParameterKeys={chosenParameterKeys.get}
        parameters={[...parametersMap.values()].filter(
          (p) => p.type === 'string'
        )}
        onSubmit={handleSubmit}
      />
    </>
  );
};

const SettingParametersWindow = ({
  isOpen,
  onClose,
  parameters,
  defaultParameterKeys,
  onSubmit,
}: WindowProps<{
  parameters: Parameter[];
  defaultParameterKeys: string[];
  onSubmit: (parameterKeys: string[]) => void;
}>) => {
  const [chosenKeys, setChosenKeys] = useState(
    () => new Set(defaultParameterKeys)
  );

  const handleChoose = (parameterKey: string) => () => {
    const newChosenKeys = new Set(chosenKeys);
    if (chosenKeys.has(parameterKey)) {
      newChosenKeys.delete(parameterKey);
    } else {
      newChosenKeys.add(parameterKey);
    }
    setChosenKeys(newChosenKeys);
  };

  const handleSubmit = () => {
    onSubmit([...chosenKeys]);
    onClose();
  };

  return (
    <Window
      w="700px"
      isOpen={isOpen}
      onClose={onClose}
      heading="Выберите параметры"
      submitProps={{ isDisabled: chosenKeys.size === 0, onClick: handleSubmit }}
    >
      <Wrap>
        {parameters.map((p) => (
          <CheckboxButton
            key={p.key}
            isActive={chosenKeys.has(p.key)}
            children={p.name}
            onClick={handleChoose(p.key)}
          />
        ))}
      </Wrap>
    </Window>
  );
};

const CheckboxButton = ({ isActive, ...props }: ButtonProps) => (
  <Button
    px={2}
    py={1}
    borderRadius={4}
    bg={isActive ? '#852AD3' : 'transparent'}
    color={isActive ? 'neutral.1' : '#852AD3'}
    border="1px solid #852AD3"
    variant="empty"
    {...props}
  />
);

export default SettingParametersButton;
