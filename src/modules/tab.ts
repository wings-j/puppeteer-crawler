import { Page } from 'puppeteer'
import { Context } from '../core/context.js'
import { getElement } from '../methods/get-element.js'
import { getElements } from '../methods/get-elements.js'
import { Handle } from './handle.js'

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

    this.page.setViewport({ width: 1920, height: 1080 })
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
    if (this.context.pool.size > this.context.options.parallel) {
      this.context.pool.delete(this)
      await this.page.close()
    } else {
      await this.page.goto('about:blank')
    }
  }

  /**
   * 等待空闲
   * @param min 最少时间
   * @param max 最大时间
   */
  async wait(min?: number, max?: number) {
    await this.page.waitForNetworkIdle({ idleTime: min, timeout: max })
    await this.page.evaluate(async () => await new Promise(resolve => window.setTimeout(resolve)))
  }

  /**
   * 滚动
   * @param y 纵轴位置
   * @param delta 增量
   * @param smooth 平滑
   */
  async scroll({ y = 0, delta = false, smooth = false }) {
    await this.page.evaluate<any[]>(
      (y, delta, smooth) => window.scrollTo({ left: 0, top: delta ? window.scrollY + y : y, behavior: smooth ? 'smooth' : 'auto' }),
      y,
      delta,
      smooth
    )
  }

  /**
   * 获取句柄
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
   * @param selector 选择器
   * @param xpath X路径
   * @return 元素
   */
  async getHandles(selector: string, xpath?: boolean) {
    return (await getElements(this.page, selector, xpath)).map(a => new Handle(a))
  }
}

export { Tab }
