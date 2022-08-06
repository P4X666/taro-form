import { CommonEventFunction, StandardProps, FormItemProps } from "@tarojs/components";

/** 选择器通用参数 */
interface PickerStandardProps extends StandardProps, FormItemProps {
  /**
   * 选择器类型，默认是普通选择器
   * @default undefined
   * @supported weapp, h5, rn
   */
  mode?: keyof PickerStandardProps.Mode
  /**
   * 是否禁用
   * @default false
   * @supported weapp, h5, rn
   */
  disabled?: boolean
  /**
   * 取消选择或点遮罩层收起 picker 时触发
   * @supported weapp, h5, rn
   */
  onCancel?: CommonEventFunction
}

declare namespace PickerStandardProps {
  /** 选择器类型 */
  interface Mode {
    /** 普通选择器 */
    selector
    /** 多列选择器 */
    multiSelector
    /** 时间选择器 */
    time
    /** 日期选择器 */
    date
    /** 省市区选择器 */
    region
  }
}

/** 
 * 多列选择器：mode = multiSelector
 * 覆盖 taro-ui 原有的类型 在原有的基础上加上了 hyphens 连字符
 *  */
interface PickerMultiSelectorProps extends PickerStandardProps {
  /** 选择器类型 */
  mode: 'multiSelector'
  /**
   * mode为 selector 或 multiSelector 时，range 有效
   * @supported weapp, h5, rn
   * @default []
   */
  range: Array<string[]> | Array<number[]> | Array<Record<string, any>[]>
  /**
   * 当 range 是一个 Object Array 时，通过 rangeKey 来指定 Object 中 key 的值作为选择器显示内容
   * @supported weapp, h5, rn
   */
  rangeKey?: string
  /**
   * 表示选择了 range 中的第几个（下标从 0 开始）
   * @supported weapp, h5, rn
   * @default []
   */
  value: number[] | string[] | Record<string, any>[]
  /**
   * 当 value 改变时触发 change 事件，event.detail = {value}
   * @supported weapp, h5, rn
   */
  onChange: CommonEventFunction<PickerMultiSelectorProps.ChangeEventDetail>
  /**
   * 列改变时触发
   * @supported weapp, h5, rn
   */
  onColumnChange?: CommonEventFunction<PickerMultiSelectorProps.ColumnChangeEventDetail>,
  /** 连字符 */
  hyphens?: string
}

declare namespace PickerMultiSelectorProps {
  interface ChangeEventDetail {
    /** 表示变更值的下标 */
    value: number[]
  }
  interface ColumnChangeEventDetail {
    /** 表示改变了第几列（下标从0开始） */
    column: number
    /** 表示变更值的下标 */
    value: number
  }
}