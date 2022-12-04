import { ElementHandle } from 'puppeteer'
import { getAttribute } from '../methods/get-attribute.js'
import { getElement } from '../methods/get-element.js'
import { getElements } from '../methods/get-elements.js'

/**
 * 句柄
 */
class Handle {
  /**
   * 葱数组获取属性
   * @param handles 句柄
   * @param attribute 属性
   * @return 值
   */
  static async getAttributesFromList(handles: Handle[], attribute: string) {
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
   * @param attribute 属性
   * @param property JS属性
   * @return 值
   */
  async getAttribute(attribute: string, property = false) {
    return getAttribute(this.element, attribute, property)
  }
}

export { Handle }
