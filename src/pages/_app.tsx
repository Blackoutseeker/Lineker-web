import { FC } from 'react'
import { AppProps } from 'next/app'
import { Provider, useSelector } from 'react-redux'
import store, { StoreState } from '@store/index'
import { ThemeProvider } from 'styled-components'
import dark from '@styles/themes/dark'
import light from '@styles/themes/light'
import GlobalStyle from '@styles/global'
import { AuthProvider } from '@services/auth'

const ThemeWrapper: FC = ({ children }) => {
  const theme = useSelector((state: StoreState) => state.theme)

  return (
    <ThemeProvider theme={theme ? dark : light}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeWrapper>
    </Provider>
  )
}

export default MyApp
