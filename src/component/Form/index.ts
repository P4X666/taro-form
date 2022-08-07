import { FC } from 'react'
import Form from './Form'
import Item, { FormItemProps } from './FormItem'

export type IFormComponent = typeof Form & {
  Item: FC<FormItemProps>
}
const TransForm: IFormComponent = Form as IFormComponent
TransForm.Item = Item

export default TransForm;