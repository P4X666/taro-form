import { AtComponent } from '../base';

export interface FormSwitchProps
  extends Omit<AtSwitchProps, "checked"> {
  /**
   * 是否显示开启
   * @default false
   */
  value?: boolean
}

export interface AtSwitchProps extends AtComponent {
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
   * 输入框值改变时触发的事件
   */
  onChange?: (value: boolean) => void
}