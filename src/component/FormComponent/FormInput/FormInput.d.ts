import { AtInputProps } from 'taro-ui/types/input';

export interface FormInputProps extends Omit<AtInputProps, 'name' | 'onChange'> {
  name?: string,
  onChange?: ()=>{}
}
