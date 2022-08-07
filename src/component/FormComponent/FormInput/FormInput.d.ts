import { AtInputProps } from 'taro-ui/types/input';
import { ComponentClass } from 'react';

export interface FormInputProps extends Omit<AtInputProps, 'name' | 'onChange'> {
  name?: string,
  onChange?: ()=>{}
}

declare const FormInput: ComponentClass<FormInputProps>

export default FormInput