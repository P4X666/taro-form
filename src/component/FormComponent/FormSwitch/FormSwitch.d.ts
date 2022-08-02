import AtComponent from 'taro-ui/types/base';
import { ComponentClass } from 'react';

export interface FormSwitchProps extends AtComponent {
  /**
   * 标签名
   */
  title?: string
  /**
   * 背景颜色
   * @default #6190e8
   */
  color?: string
  /**
   * 是否显示开启
   * @default false
   */
  value?: boolean
  /**
   * 是否禁止点击
   * @default false
   */
  disabled?: boolean
  /**
   * 是否显示下划线边框
   * @default false
   */
  border?: boolean
  /**
   * 输入框值改变时触发的事件
   */
  onChange?: (value: boolean) => void
}

declare const FormSwitch: ComponentClass<FormSwitchProps>

export default FormSwitch