import RollupVisualizer from 'rollup-plugin-visualizer'
import defaultConfig from './rollup.esm.config'

export default Object.assign({}, defaultConfig, {
  plugins: [...defaultConfig.plugins, RollupVisualizer()]
})
