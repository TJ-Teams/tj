import { Stack, StackProps } from '@chakra-ui/react';
import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import * as yup from 'yup';
import useSubscriptions, { UseSubscriptions } from '~/hooks/useSubscriptions';
import useValue, { ValueRef } from '~/hooks/useValue';

type DataErrors<TValidData> = {
  focusField?: keyof TValidData;
};

type FormContent<TValidData> = {
  schema: yup.AnyObjectSchema;
  data: ValueRef<Partial<TValidData>>;
  onDataChange: (dataParts: Partial<TValidData>) => void;
  dataErrors: DataErrors<TValidData>;
  subscriptions: UseSubscriptions<keyof TValidData>;
};

type Props<TValidData> = {
  schema: yup.AnyObjectSchema;
  defaultData?: Partial<TValidData>;
  onSubmit?: (data: TValidData) => Promise<void> | void;
  withForceUpdateOnChange?: boolean;
  children: ReactNode;
} & Omit<StackProps, 'onSubmit'>;

// eslint-disable-next-line
const FormContext = createContext<FormContent<any>>({
  schema: yup.object(),
  data: { get: () => {}, set: () => {} },
  onDataChange: () => {},
  dataErrors: {},
  subscriptions: { useSubscribe: () => {}, ping: () => {} },
});

export const useFormContext = <TValidData,>(): FormContent<TValidData> =>
  useContext(FormContext);

const FormLayout = <TValidData,>({
  id,
  schema,
  defaultData,
  onSubmit,
  ...props
}: Props<TValidData>) => {
  type Data = Partial<TValidData>;

  const defaultSchemaData = schema.getDefault() as Data;

  const data = useValue({ ...defaultSchemaData, ...defaultData });
  const [dataErrors, setEventDataErrors] = useState<DataErrors<TValidData>>({});
  const subscriptions = useSubscriptions<keyof TValidData>();

  const onDataChange = (dataParts: Data) => {
    data.set({ ...data.get, ...dataParts });
    Object.keys(dataParts).forEach((key) => {
      subscriptions.ping(key as keyof Data);
    });
  };

  const validateData = async (
    data: Data
  ): Promise<[TValidData | undefined, DataErrors<TValidData>]> => {
    try {
      const validData: TValidData = await schema.validate(data);
      return [validData, {}];
    } catch (err) {
      const error = err as yup.ValidationError;
      const dataErrors: DataErrors<TValidData> = {
        focusField: error.params?.path as keyof Data,
      };
      return [undefined, dataErrors];
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setEventDataErrors({});
    const [validData, dataErrors] = await validateData(data.get);

    if (validData) {
      await onSubmit?.(validData);
    } else {
      console.warn(`[${id}]`, dataErrors);
      setEventDataErrors(dataErrors);
    }
  };

  const contextValue: FormContent<TValidData> = useMemo(
    () => ({ schema, data, onDataChange, dataErrors, subscriptions }),
    [dataErrors]
  );

  return (
    <FormContext.Provider value={contextValue}>
      <Stack as="form" id={id} onSubmit={handleSubmit} {...props} />
    </FormContext.Provider>
  );
};

export default FormLayout;
