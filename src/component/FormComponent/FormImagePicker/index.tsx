import React from 'react';
import { FormC } from 'src/component/Form/FormItem';
import ImagePicker from 'src/component/ImagePicker';
import { FormImagePickerProps } from './FormImagePicker';

const FormImagePicker: FormC<FormImagePickerProps> = (props) => {
  const { value, children, ...restProps } = props
  return <ImagePicker value={value || []} {...restProps}>{children}</ImagePicker>;
};
FormImagePicker.displayName = 'FormItem';
export default FormImagePicker;
