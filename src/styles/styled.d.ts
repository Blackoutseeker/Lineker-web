import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secundary: string
      background: string
      title: string
      placeholder: string
    }
    shadow: string
  }
}
