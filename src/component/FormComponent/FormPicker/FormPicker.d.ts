import { CommonEventFunction, PickerMultiSelectorProps } from "@tarojs/components";
/** 
 * 多列选择器：mode = multiSelector
 * 覆盖 taro-ui 原有的类型 在原有的基础上加上了 hyphens 连字符
 *  */
interface FormPickerMultiSelectorProps extends Omit<PickerMultiSelectorProps, 'onChange'> {
  /**
   * 当 value 改变时触发 change 事件，event.detail = {value}
   * @supported weapp, h5, rn
   */
  onChange?: CommonEventFunction<PickerMultiSelectorProps.ChangeEventDetail>
  /** 连字符 */
  hyphens?: string
}
