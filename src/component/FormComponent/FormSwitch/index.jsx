import { AtSwitch } from 'taro-ui';

const FormSwitch = (props) => {
  const { value, ...restProps } = props;
  return <AtSwitch checked={value} {...restProps} />;
};
FormSwitch.type = 'FormItem';
export default FormSwitch;
