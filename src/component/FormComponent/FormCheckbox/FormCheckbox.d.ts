import AtComponent from 'taro-ui/types/base';
import { CheckboxOption } from 'taro-ui/types/checkbox';

export interface FormCheckboxProps<T> extends AtComponent {
  options: Array<CheckboxOption<T>>
  value?: Array<T>
  onChange?: (selectedList: Array<T>) => void,
}
