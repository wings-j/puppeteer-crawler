import { ElementHandle } from 'puppeteer'

type Attribute = 'href' | 'innerText'

/**
 * 获取属性
 * @param handle 句柄
 * @param attribute 属性
 * @return 值
 */
async function getAttribute(handle: ElementHandle, attribute: Attribute) {
  switch (attribute) {
    case 'href':
      return (await handle.evaluate(element => element.getAttribute('href'))) ?? undefined
    case 'innerText':
      return (await handle.evaluate(element => (element as HTMLElement).innerText)) ?? undefined

    default:
      return undefined
  }
}

export { getAttribute }
export type { Attribute }
