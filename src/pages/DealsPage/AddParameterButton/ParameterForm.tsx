import Form from '~/components/Form';
import { SelectOption } from '~/components/Select/types';
import { useDealsContext } from '../deals-context';
import { createParameterFormSchema, ParameterFormData } from './parameter-data';

type Props = {
  onSubmit: (data: ParameterFormData) => void;
};

const options: SelectOption[] = [
  { key: 'string', label: 'Текстовый параметр' },
  { key: 'number', label: 'Числовой параметр' },
  { key: 'date', label: 'Параметр даты' },
];

const ParameterForm = ({ onSubmit }: Props) => {
  const { parameters } = useDealsContext();

  return (
    <Form.Layout
      id="parameter-form"
      schema={createParameterFormSchema(parameters.get)}
      onSubmit={onSubmit}
      spacing={6}
    >
      <Form.Input isInitialFocus isRequired field="key" label="Ключ" />
      <Form.Input isRequired field="name" label="Название" />
      <Form.SingleSelect
        isRequired
        field="type"
        label="Тип"
        options={options}
      />
    </Form.Layout>
  );
};

export default ParameterForm;
