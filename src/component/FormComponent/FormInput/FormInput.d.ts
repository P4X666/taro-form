import { AtInputProps } from 'taro-ui/types/input';
import { ComponentClass } from 'react';

export interface FormInputProps extends AtInputProps { }

declare const FormInput: ComponentClass<FormInputProps>

export default FormInput