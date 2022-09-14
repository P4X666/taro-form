import { FC } from 'react'
import Form from './Form'
import Item from './FormItem'
import { FormItemProps } from './FormItem'

export type IFormComponent = typeof Form & {
  Item: FC<FormItemProps>
}
const TransForm: IFormComponent = Form as IFormComponent
TransForm.Item = Item

export default TransForm;