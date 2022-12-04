Crawler based on [puppeteer](https://www.npmjs.com/package/puppeteer).

## Usage

Install:

```sh
npm install @wings-j/puppeteer-crawler
```

Example:

```ts
import { Context, Handle } from '../dist/index.js'
import { promises as Fs } from 'fs'

let context = new Context()
await context.launch({
  headless: false,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  userDataDir: 'C:/Users/wingsj/AppData/Local/Google/Chrome/User Data'
})
let tab = await context.createTab()
await tab.open('https://twitter.com/home')

let srcs = []
tab.page.setRequestInterception(true)
tab.page.on('request', request => {
  if (/pbs\.twimg\.com\/media/.test(request.url())) {
    srcs.push(request.url().replace(/&name=\w+$/, '&name=large'))
  }

  request.continue()
})
for (let i = 0; i < 100; i++) {
  await tab.scroll({ y: 2000, delta: true, smooth: true })
  await tab.wait()
}

await Fs.writeFile('./test/data.json', JSON.stringify(srcs))

await context.exit()
```

## API

### `Context`

#### `constructor(options?: Partial<LaunchOptions>)`

Context.

Parameters:

- `options`: launch options

#### `async launch(options?: PuppeteerLaunchOptions): void`

Launch the browser, must be invoked before using other methods.

Parameters:

- options: 选项。[PuppeteerLaunchOptions](https://pptr.dev/api/puppeteer.puppeteerlaunchoptions).

#### `async createTab(): Tab`

Create a tab, possibly from the cache pool.

Return:

- a tab

### `LaunchOptions`

Interface. Launch options.

Members:

- parallel: max tab count

### `Tab`

#### `async open(url: string): void`

Open the page of the url.

Parameters:

- `url`: URL

#### `async getHandle(selector: string, xpath?: boolean): Promise<Handle|undefined>`

Get the element handler of the selector.

Parameters:

- `selector`: CSS selector or XPath selector
- `xpath`: use XPath

Return:

- element handler

#### `async getHandles(selector: string, xpath?: boolean): Promise<Handle[]>`

Get the element handlers of the selector.

Parameters:

- `selector`: CSS selector or XPath selector
- `xpath`: use XPath

Return:

- element handlers

### `Handle`

#### `static async getAttributes(handles: Handle[], attribute: string): Promise<string[]>`

Get attributes of the element handlers.

Parameters:

- `handles`: element handlers
- `attribute`: attribute name

Return:

- attributes

#### `async getHandle(selector: string, xpath?: boolean): Promise<Handle|undefined>`

Get the element handler of the selector.

Parameters:

- `selector`: CSS selector or XPath selector
- `xpath`: use XPath

Return:

- element handler

#### `sync getHandles(selector: string, xpath?: boolean): Promise<Handle[]>`

Get the element handlers of the selector.

Parameters:

- `selector`: CSS selector or XPath selector
- `xpath`: use XPath

Return:

- element handlers

#### `async getAttribute(attribute: string): Promise<string|undefined>`

Get the attribute.

Parameters:

- `attribute`: attribute name

Return:

- attribute
