import React from 'react';
import { emptyFunction, FormC } from 'src/component/Form/FormItem';
import ImagePicker from 'src/component/ImagePicker';
import { FormImagePickerProps } from './FormImagePicker';

const FormImagePicker: FormC<FormImagePickerProps> = (props) => {
  const { value, children, onChange, ...restProps } = props
  return (
    <ImagePicker
      value={value || []}
      onChange={onChange || emptyFunction}
      {...restProps}
    >
      {children}
    </ImagePicker>
  );
};
FormImagePicker.displayName = 'FormItem';
export default FormImagePicker;
