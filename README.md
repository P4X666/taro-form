# taro-form
仿照 ant design 的form设计的taro表单

## API

### Form

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| ref | form 控制实例 | [FormInstance](#FormInstance) | - |  |
| initialValues | 表单默认值，只有初始化以及重置时生效 | object | - |  |
| onFieldsChange | 字段更新时触发回调事件 | function(changedFields, allFields) | - |  |

## Form.Item

表单字段组件，用于数据双向绑定、校验、布局等。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| name | 字段名 | string | - |  |
| label | `label` 标签的文本 | ReactNode | - |  |
| getValueFromEvent | 设置如何将 event 的值转换成字段值 | (..args: any\[]) => any | - |  |
| required | 必填样式设置。如不设置，则会根据校验规则自动生成 | boolean | false |  |
| rules | 校验规则，设置字段的校验逻辑。点击[此处](#components-form-demo-basic)查看示例 | [Rule](#Rule)\[] | - |  |
| validateTrigger | 设置字段校验的时机 | `onBlur` | `onChange` | `onChange` |  |

被设置了 `name` 属性的 `Form.Item` 包装的控件，表单控件会自动添加 `value` , `onChange`（或 `validateTrigger` 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

1. 你**不再需要也不应该**用 `onChange` 来做数据收集同步（你可以使用 Form 的 `onFieldsChange`）， `onChange` 被 ***组件内部覆盖***。
2. 你不能用控件的 `value` 或 `defaultValue` 等属性来设置表单域的值，默认值可以用 Form 里的 `initialValues` 来设置。注意 `initialValues` 不能被 `setState` 动态更新，你需要用 `setFieldValue` 来更新。
3. 你不应该用 `setState`，可以使用 `form.setFieldValue` 来动态改变表单值。

### FormInstance

| 名称 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| getFieldValue | 获取对应字段名的值 | (name: string) => any |  |
| getFieldsValue | 获取所有字段名的值 | () => any |  |
| setFieldValue | 设置对应字段名的值 | (name: string, value: any) => void | |
| setFieldsValue | 设置表单的值。如果你只想修改 Form.List 中单项值，请通过 `setFieldValue` 进行指定 | (values) => void |  |
| validateField | 校验指定子组件域 | () => Promise |  |
| validateAllFields | 校验表单所有子项 | () => Promise |  |
| resetFields | 重置一组字段到 `initialValues` | () => void |  |
