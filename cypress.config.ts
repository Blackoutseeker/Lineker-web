import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: false,
  baseUrl: 'http://localhost:3000',
  screenshotOnRunFailure: false,
  video: false,
  retries: {
    runMode: 2,
    openMode: 1
  }
})
