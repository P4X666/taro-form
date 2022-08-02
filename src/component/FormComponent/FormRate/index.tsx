import React from 'react';
import { AtRate } from 'taro-ui';

import { FormC } from 'src/component/Form/FormItem';
import { FormRateProps } from './FormRate';

const FormRate: FormC<FormRateProps> = (props) => {
  return <AtRate {...props} />;
};
FormRate.displayName = 'FormItem';
export default FormRate;
