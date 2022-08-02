import AtComponent from 'taro-ui/types/base';
import { CheckboxOption } from 'taro-ui/types/checkbox';
import { ComponentClass } from 'react';

export interface FormCheckboxProps<T> extends AtComponent {
  options: Array<CheckboxOption<T>>
  value: Array<T>
  onChange: (selectedList: Array<T>) => void,
}
declare const FormCheckbox: ComponentClass<FormCheckboxProps<any>>

export default FormCheckbox