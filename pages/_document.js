import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
					<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto:400,700" />
					{this.props.styleTags}
        </Head>
        <body style={{ 'fontFamily': "'Roboto', sans-serif", 'backgroundColor': '#eee', 'fontSize': '16px', 'color': '#333' }}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
