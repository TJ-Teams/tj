import { Center, CenterProps, Icon, Text } from '@chakra-ui/react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { BsUpload } from 'react-icons/bs';

type Props = Omit<CenterProps, 'onDrop'> &
  Pick<DropzoneOptions, 'accept' | 'onDrop'>;

const Dropzone = ({ accept, onDrop, ...props }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
    multiple: false,
  });

  return (
    <Center
      w="600px"
      h="250px"
      p={4}
      flexDirection="column"
      borderRadius={8}
      border="3px dashed"
      borderColor={isDragActive ? 'primary.3' : 'primary.2'}
      {...props}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Text
        fontWeight="bold"
        color="blackAlpha.700"
        children={
          isDragActive
            ? 'Перетащите файл...'
            : 'Перетащите файл или нажмите, чтобы загрузить'
        }
      />

      <Icon as={BsUpload} mt={4} boxSize="75px" color="blackAlpha.700" />
    </Center>
  );
};

export default Dropzone;
