import { FC } from 'react'
import { AppProps } from 'next/app'
import { Provider, useSelector } from 'react-redux'
import store, { IRootReducer } from '@store/index'
import { ThemeProvider } from 'styled-components'
import dark from '@styles/themes/dark'
import light from '@styles/themes/light'
import GlobalStyle from '@styles/global'
import { AuthProvider } from '@services/auth'

const StyledInvolve: FC = ({ children }) => {
  const theme = useSelector((state: IRootReducer) => state.theme)

  return (
    <ThemeProvider theme={theme === 'dark' ? dark : light}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <StyledInvolve>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </StyledInvolve>
    </Provider>
  )
}

export default MyApp
