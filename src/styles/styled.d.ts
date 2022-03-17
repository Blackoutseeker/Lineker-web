import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
      background: string
      title: string
      placeholder: string
      red: string
      green: string
      scrollThumb: string
      scrollTrack: string
      dismissButton: string
    }
    shadow: string
  }
}
