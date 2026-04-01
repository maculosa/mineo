export type ProNumberInputSize = 'sm' | 'md' | 'lg'

export interface ProNumberInputProps {
  /**
   * 绑定值
   * @description 数字输入框的值
   * @default 0
   */
  modelValue?: number
  /**
   * 最小值
   * @description 数字输入框的最小值
   * @default undefined
   */
  min?: number
  /**
   * 最大值
   * @description 数字输入框的最大值
   * @default undefined
   */
  max?: number
  /**
   * 步进值
   * @description 点击增减按钮时值的变化量
   * @default 1
   */
  step?: number
  /**
   * 小数位数
   * @description 保留小数位数
   * @default 0
   */
  decimal?: number
  /**
   * 前缀
   * @description 输入框前置内容，如货币符号 ¥
   * @default ''
   */
  prefix?: string
  /**
   * 后缀
   * @description 输入框后置内容，如百分比符号 %
   * @default ''
   */
  suffix?: string
  /**
   * 是否显示增减按钮
   * @description 控制增减按钮的显示隐藏
   * @default true
   */
  showControls?: boolean
  /**
   * 是否隐藏输入框
   * @description 只显示前缀、后缀和增减按钮
   * @default false
   */
  hideInput?: boolean
  /**
   * 是否禁用
   * @description 禁用状态
   * @default false
   */
  disabled?: boolean
  /**
   * 输入框宽度
   * @description 输入框的宽度，单位像素
   * @default 80
   */
  width?: number
  /**
   * 尺寸大小
   * @description 组件的尺寸大小
   * @default 'md'
   */
  size?: ProNumberInputSize
}