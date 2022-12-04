import { Browser, launch, PuppeteerLaunchOptions } from 'puppeteer'
import { Tab } from '../modules/tab.js'

/**
 * 选项
 */
interface LaunchOptions {
  parallel: number
}

/**
 * 上下文
 */
class Context {
  browser!: Browser
  options: LaunchOptions
  pool: Set<Tab> = new Set()

  /**
   * 构造方法
   * @param headless 无头
   * @param parallel 并行数
   */
  constructor(options?: Partial<LaunchOptions>) {
    this.options = Object.assign(
      {
        parallel: 10
      },
      options
    )
  }

  /**
   * 启动
   * @description 使用前必须启动
   * @param options 选项
   */
  async launch(options?: PuppeteerLaunchOptions) {
    this.browser = await launch(
      Object.assign(
        {
          ignoreHTTPSErrors: true
        },
        options
      )
    )
  }

  /**
   * 退出
   */
  async exit() {
    await this.browser.close()
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
