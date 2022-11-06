import { Page } from 'puppeteer'
import { Context } from '..'
import { getElement } from '../methods/get-element'
import { getElements } from '../methods/get-elements'
import { Handle } from './handle'

/**
 * 标签页
 */
class Tab {
  context: Context
  page: Page
  idle: boolean = true

  /**
   * 构造方法
   * @param context 上下文
   * @param page 页面
   */
  constructor(context: Context, page: Page) {
    this.context = context
    this.page = page
  }

  /**
   * 打开
   * @param url 地址
   */
  async open(url: string) {
    this.idle = false
    await this.page.goto(url, { waitUntil: 'networkidle2' })
  }
  /**
   * 关闭
   */
  async close() {
    this.idle = true
    if (this.context.pool.size > this.context.parallel) {
      this.context.pool.delete(this)
      await this.page.close()
    } else {
      await this.page.goto('about:blank')
    }
  }

  /**
   * 获取句柄
   * @param element 元素或页面
   * @param selector 选择器
   * @param xpath X路径
   * @return 元素
   */
  async getHandle(selector: string, xpath?: boolean) {
    let element = await getElement(this.page, selector, xpath)

    if (element) {
      return new Handle(element)
    } else {
      undefined
    }
  }
  /**
   * 获取句柄组
   * @param element 元素或页面
   * @param selector 选择器
   * @param xpath X路径
   * @return 元素
   */
  async getHandles(selector: string, xpath?: boolean) {
    return (await getElements(this.page, selector, xpath)).map(a => new Handle(a))
  }
}

export { Tab }
