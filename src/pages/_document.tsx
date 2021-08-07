import Document, {
  DocumentInitialProps,
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(
    context: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = context.renderPage

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(context)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            data-ad-client="ca-pub-8834567925593683"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
          <meta name="author" content="Felipe Pereira de Souza Silva" />
          <meta
            property="og:image"
            content="https://raw.githubusercontent.com/Blackoutseeker/Lineker-web/main/src/assets/images/Lineker.png"
          />
          <meta
            property="og:image:secure_url"
            content="https://raw.githubusercontent.com/Blackoutseeker/Lineker-web/main/src/assets/images/Lineker.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="80" />
          <meta property="og:image:height" content="80" />
          <meta property="og:image:alt" content="Lineker" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
