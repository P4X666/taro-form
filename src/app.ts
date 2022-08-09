import { Component, ReactNode } from 'react'
import 'taro-ui/dist/style/index.scss';
import './app.less'

class App extends Component<{ children:ReactNode }> {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
