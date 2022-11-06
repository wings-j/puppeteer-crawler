import { ElementHandle } from 'puppeteer'
import { Attribute } from '../methods/get-attribute'
import { getElement } from '../methods/get-element'
import { getElements } from '../methods/get-elements'

/**
 * 句柄
 */
class Handle {
  /**
   * 获取属性
   * @param handles 句柄
   * @param attribute 属性
   * @return 值
   */
  static async getAttributes(handles: Handle[], attribute: Attribute) {
    return await Promise.all(handles.map(a => a.getAttribute(attribute)))
  }

  element: ElementHandle

  /**
   * 构造方法
   * @param element 元素
   */
  constructor(element: ElementHandle) {
    this.element = element
  }

  /**
   * 获取句柄
   * @param element 元素或页面
   * @param selector 选择器
   * @param xpath X路径
   * @return 元素
   */
  async getHandle(selector: string, xpath?: boolean) {
    let element = await getElement(this.element, selector, xpath)

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
    return (await getElements(this.element, selector, xpath)).map(a => new Handle(a))
  }
  /**
   * 获取属性
   * @param handle 句柄
   * @param attribute 属性
   * @return 值
   */
  async getAttribute(attribute: Attribute) {
    switch (attribute) {
      case 'href':
        return (await this.element.evaluate(element => element.getAttribute('href'))) ?? undefined
      case 'innerText':
        return (await this.element.evaluate(element => (element as HTMLElement).innerText)) ?? undefined

      default:
        return undefined
    }
  }
}

export { Handle }
