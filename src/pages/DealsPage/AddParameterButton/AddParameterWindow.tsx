import Window, { WindowProps } from '~/components/Window';
import { Parameter } from '~/types/deals';
import { useDealsContext } from '../deals-context';
import ParameterForm from './ParameterForm';

const AddParameterWindow = ({ isOpen, onClose }: WindowProps) => {
  const { parameters, subscriptions } = useDealsContext();

  const handleSubmit = (newParameter: Parameter) => {
    parameters.set([...parameters.get, newParameter]);
    subscriptions.ping('table');
    onClose();
  };

  return (
    <Window
      isOpen={isOpen}
      onClose={onClose}
      heading="Добавить параметр"
      submitProps={{
        type: 'submit',
        form: 'parameter-form',
        children: 'Добавить',
      }}
      children={<ParameterForm onSubmit={handleSubmit} />}
    />
  );
};

export default AddParameterWindow;
