import { AtSwitchProps } from 'taro-ui/types/switch';

export interface FormSwitchProps
  extends Omit<AtSwitchProps, "checked"> {
  /**
   * 是否显示开启
   * @default false
   */
  value?: boolean
}