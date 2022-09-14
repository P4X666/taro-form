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
import { FormRateProps } from "./src/component/FormComponent/FormRate/FormRate";
import { FormSwitchProps } from "./src/component/FormComponent/FormSwitch/FormSwitch";
import Form from "./src/component/Form/index";

declare const ImagePicker: FormC<ImagePickerProps>;
declare const FormCheckbox: FormC<FormCheckboxProps<any>>
declare const FormImagePicker: FormC<FormImagePickerProps>
declare const FormInput: FormC<FormInputProps>
declare const FormPicker: FormC<
  | FormPickerMultiSelectorProps
  | FormPickerTimeProps
  | FormPickerDateProps
  | FormPickerRegionProps
  | FormPickerSelectorProps
  | FormPickerSimpleProps
>;
declare const FormRate: FormC<FormRateProps>;
declare const FormSwitch: FormC<FormSwitchProps>;

export {
  ImagePicker,
  FormCheckbox,
  FormImagePicker,
  FormInput,
  FormPicker,
  FormRate,
  FormSwitch,
  Form,
};