import clipboardy from 'clipboardy'

export default (
  on: Cypress.PluginEvents,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config: Cypress.PluginConfigOptions
) => {
  on('task', {
    getTextFromClipboard() {
      const text = clipboardy.readSync()
      return text
    }
  })
}
