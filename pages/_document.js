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
					<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto:400,700" />
					{this.props.styleTags}
        </Head>
        <body style={{ 'fontFamily': "'Roboto', sans-serif", 'background-color': '#eee', 'font-size': '14px', 'color': '#333' }}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}