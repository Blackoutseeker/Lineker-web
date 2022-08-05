import { defineConfig } from 'cypress'

export default defineConfig({
  fixturesFolder: false,
  baseUrl: 'http://localhost:3000',
  screenshotOnRunFailure: false,
  video: false
})
