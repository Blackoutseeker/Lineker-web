import { FC } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider, useSelector } from 'react-redux'
import store, { StoreState } from '@store/index'
import { ThemeProvider } from 'styled-components'
import dark from '@styles/themes/dark'
import light from '@styles/themes/light'
import GlobalStyle from '@styles/global'
import { AuthProvider } from '@services/authProvider'

const ThemeWrapper: FC = ({ children }) => {
  const theme = useSelector((state: StoreState) => state.theme)

  return (
    <ThemeProvider theme={theme ? dark : light}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <AuthProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeWrapper>
    </Provider>
  )
}

export default App
