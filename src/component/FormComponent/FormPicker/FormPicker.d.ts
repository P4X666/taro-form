import { CommonEventFunction, PickerMultiSelectorProps, PickerTimeProps, PickerDateProps, PickerRegionProps, PickerSelectorProps } from "@tarojs/components";

/** 选择器通用参数 */
export interface FormPickerSimpleProps {
  value?: string | undefined | number,
  onClick: CommonEventFunction<any>
}

/** 
 * 多列选择器：mode = multiSelector
 * 覆盖 taro-ui 原有的类型 在原有的基础上加上了 hyphens 连字符
 *  */
export interface FormPickerMultiSelectorProps
  extends Omit<PickerMultiSelectorProps, "value" | "onChange"> {
  value?: string | number;
  /**
   * 当 value 改变时触发 change 事件，event.detail = {value}
   * @supported weapp, h5, rn
   */
  onChange?: (_data: any) => void;
  /** 连字符 */
  hyphens?: string;
  /** 自定义节点 label、value 的字段 用法仿照 select */
  fieldNames?: {
    value: string;
    label: string;
  };
  placeholder?: string
}

export interface FormPickerTimeProps extends Omit<PickerTimeProps, 'value' | 'onChange'> {
  value?: string
  /**
   * 当 value 改变时触发 change 事件，event.detail = {value}
   * @supported weapp, h5, rn
   */
  onChange?: CommonEventFunction<PickerTimeProps.ChangeEventDetail>
  placeholder?: string
}

export interface FormPickerDateProps extends Omit<PickerDateProps, 'value' | 'onChange'> {
  value?: string
  /**
   * 当 value 改变时触发 change 事件，event.detail = {value}
   * @supported weapp, h5, rn
   */
  onChange?: CommonEventFunction<PickerDateProps.ChangeEventDetail>
  placeholder?: string
}

export interface FormPickerRegionProps extends Omit<PickerRegionProps, 'value' | 'onChange'> {
  value?: string
  /**
   * 当 value 改变时触发 change 事件，event.detail = {value}
   * @supported weapp, h5, rn
   */
  onChange?: CommonEventFunction<PickerRegionProps.ChangeEventDetail>
  placeholder?: string
}

/** 普通选择器：mode = selector */
export interface FormPickerSelectorProps
  extends Omit<PickerSelectorProps, "value" | "onChange"> {
  value?: string  | number;
  /**
   * 当 value 改变时触发 change 事件，event.detail = {value}
   * @supported weapp, h5, rn
   */
  onChange?: CommonEventFunction<PickerSelectorProps.ChangeEventDetail>;
  /** 自定义节点 label、value 的字段 用法仿照 select */
  fieldNames?: {
    value: string;
    label: string;
  };
  placeholder?: string
}
