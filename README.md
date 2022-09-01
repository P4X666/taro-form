# taro-form
仿照 ant design 的form设计的taro表单

## API

### Form

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| ref | form 控制实例 | [FormInstance](#FormInstance) | - |  |
| initialValues | 表单默认值，只有初始化以及重置时生效 | object | - |  |
| onFieldsChange | 字段更新时触发回调事件 | function(changedFields) | - |  |

## Form.Item

表单字段组件，用于数据双向绑定、校验、布局等。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| name | 字段名 | string | - |  |
| label | `label` 标签的文本 | ReactNode | - |  |
| getValueFromEvent | 设置如何将 event 的值转换成字段值 | (..args: any\[]) => any | - |  |
| required | 必填样式设置。如不设置，则会根据校验规则自动生成 | boolean | false |  |
| rules | 校验规则，设置字段的校验逻辑。 | [Rule](#Rule)\[] | - |  |
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

#### Rule

Rule 支持接收 object 进行配置，也支持 function 来动态获取 form 的数据：  
更多请参考[此处](https://github.com/yiminghe/async-validator#type)

| 名称 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| defaultField | 仅在 `type` 为 `array` 类型时有效，用于指定数组元素的校验规则 | [rule](#Rule) |  |
| enum | 是否匹配枚举中的值（需要将 `type` 设置为 `enum`） | any\[] |  |
| fields | 仅在 `type` 为 `array` 或 `object` 类型时有效，用于指定子元素的校验规则 | Record&lt;string, [rule](#Rule)> |  |
| len | string 类型时为字符串长度；number 类型时为确定数字； array 类型时为数组长度 | number |  |
| max | 必须设置 `type`：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度 | number |  |
| message | 错误信息，不设置时会通过[模板](#validateMessages)自动生成 | string |  |
| min | 必须设置 `type`：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度 | number |  |
| pattern | 正则表达式匹配 | RegExp |  |
| required | 是否为必选字段 | boolean |  |
| transform | 将字段值转换成目标值后进行校验 | (value) => any |  |
| type | 类型，常见有 `string` \|`number` \|`boolean` \|`url` \| `email`。 | string |  |
| validateTrigger | 设置触发验证时机，必须是 Form.Item 的 `validateTrigger` 的子集 | string \| string\[] |  |
| validator | 自定义校验，接收 Promise 作为返回值。[示例](#components-form-demo-register)参考 | ([rule](#Rule), value) => Promise |  |
| whitespace | 如果字段仅包含空格则校验不通过，只在 `type: 'string'` 时生效 | boolean |  |

## class 组件及 function 组件各自获取ref的方式
### 1. class 组件

```jsx
import React, { Component, createRef } from 'react';
...
constructor(props) {
  super(props);
  this.formRef= createRef();
}
...
<Form ref={this.formRef}>...</Form>
```

### 2. function 组件

```jsx
import React, { useRef } from 'react';
...
const formRef = useRef();
...
<Form ref={formRef}>...</Form>
...
```