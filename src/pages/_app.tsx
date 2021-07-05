import { FC } from 'react'
import { AppProps } from 'next/app'
import { Provider, useSelector } from 'react-redux'
import store, { Reducers } from '@store/index'
import { ThemeProvider } from 'styled-components'
import dark from '@styles/themes/dark'
import light from '@styles/themes/light'
import GlobalStyle from '@styles/global'
import { AuthProvider } from '@services/auth'

const StyledProvider: FC = ({ children }) => {
  const theme = useSelector((state: Reducers) => state.theme)

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
      <StyledProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </StyledProvider>
    </Provider>
  )
}

export default MyApp
