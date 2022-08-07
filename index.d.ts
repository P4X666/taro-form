import { FormC } from './src/component/Form/FormItem';
import { ImagePickerProps } from './src/component/ImagePicker';
import { FormCheckboxProps } from './src/component/FormComponent/FormCheckbox/FormCheckbox';
import { FormImagePickerProps } from './src/component/FormComponent/FormImagePicker/FormImagePicker';
import { FormInputProps } from './src/component/FormComponent/FormInput/FormInput';
import { FormPickerSimpleProps,
  FormPickerMultiSelectorProps,
  FormPickerTimeProps,
  FormPickerDateProps,
  FormPickerRegionProps,
  FormPickerSelectorProps } from './src/component/FormComponent/FormPicker/FormPicker';

declare const ImagePicker: FormC<ImagePickerProps>;
declare const FormCheckbox: FormC<FormCheckboxProps<any>>
declare const FormImagePicker: FormC<FormImagePickerProps>
declare const FormInput: FormC<FormInputProps>
declare const FormPicker: FormC<FormPickerSimpleProps | FormPickerMultiSelectorProps | FormPickerTimeProps | FormPickerDateProps | FormPickerRegionProps | FormPickerSelectorProps>

export {
  ImagePicker,
  FormCheckbox,
  FormImagePicker,
  FormInput,
  FormPicker
};