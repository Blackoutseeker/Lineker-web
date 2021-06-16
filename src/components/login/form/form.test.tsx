import { render } from '@testing-library/react'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import light from '@styles/themes/light'
import Form from './index'

jest.mock('@styles/themes/light', () => {
  return {
    __esModule: true,
    default: (): DefaultTheme => {
      return {
        colors: {
          background: '',
          primary: '',
          secundary: '',
          title: ''
        }
      }
    }
  }
})
jest.mock('next/image', () => (props: any) => <img {...props} />)
jest.mock('@components/title', () => {
  return {
    __esModule: true,
    default: () => {
      return <div></div>
    }
  }
})

describe('Testing "Form" component', () => {
  test('Should render form', () => {
    const { container } = render(
      <ThemeProvider theme={light}>
        <Form />
      </ThemeProvider>
    )
    expect(container).toBeInTheDocument()
  })
})
