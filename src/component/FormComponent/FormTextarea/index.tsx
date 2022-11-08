import React from 'react';
import { AtTextarea } from 'taro-ui';
import { FormC } from 'src/component/Form/FormItem';
import { FormTextareaProps } from './FormTextarea';

const FormTextarea: FormC<FormTextareaProps> = (props) => {
  return <AtTextarea {...props} />;
};
FormTextarea.displayName = 'FormItem';
export default FormTextarea;
