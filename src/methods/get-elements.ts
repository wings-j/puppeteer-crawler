import { ElementHandle, Page } from 'puppeteer'

/**
 * 获取元素
 * @param element 元素或页面
 * @param selector 选择器
 * @param xpath X路径
 * @return 元素
 */
async function getElements(element: ElementHandle | Page, selector: string, xpath?: boolean) {
  if (xpath) {
    return (await element.$x(selector)) as ElementHandle<Element>[]
  } else {
    return await element.$$(selector)
  }
}

export { getElements }
