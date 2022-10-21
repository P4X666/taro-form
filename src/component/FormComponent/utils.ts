export function pxTransform(size: number): string {
  if (!size) return ''
  const designWidth = 750
  const deviceRatio = {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  }
  return `${size / deviceRatio[designWidth]}rpx`
}