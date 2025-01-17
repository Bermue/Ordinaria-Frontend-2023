import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href='https://unpkg.com/css.gg@2.0.0/icons/css/trash.css' rel='stylesheet'/>
        <link href='https://unpkg.com/css.gg@2.0.0/icons/css/user-add.css' rel='stylesheet'/>
        <link href='https://unpkg.com/css.gg@2.0.0/icons/css/eye.css' rel='stylesheet'/>
        <link href='https://unpkg.com/css.gg@2.0.0/icons/css/eye-alt.css' rel='stylesheet'/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
