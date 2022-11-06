import { Browser, launch } from 'puppeteer'
import { Tab } from '../modules/tab'

/**
 * 上下文
 */
class Context {
  browser!: Browser
  headless: boolean
  parallel: number
  pool: Set<Tab> = new Set()

  /**
   * 构造方法
   * @param headless 无头
   * @param parallel 并行数
   */
  constructor({ headless = true, parallel = 10 } = {}) {
    this.headless = headless
    this.parallel = parallel
  }

  /**
   * 启动
   * @description 使用前必须启动
   */
  async launch() {
    this.browser = await launch({ ignoreHTTPSErrors: true, headless: this.headless })
  }

  /**
   * 创建标签
   * @param url 地址
   * @return 页面
   */
  async createTab() {
    let target = Array.from(this.pool).find(a => a.idle)
    if (!target) {
      target = new Tab(this, await this.browser.newPage())
      this.pool.add(target)
    }

    return target
  }
}

export { Context }
