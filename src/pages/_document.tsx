import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { revalidate } from '@module-federation/nextjs-mf/utils';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    // Check for pathname and ensure it's not an error page
    if (ctx?.pathname && !ctx?.pathname?.endsWith('_error')) {
      await revalidate().then((shouldUpdate: boolean) => {
        if (shouldUpdate) {
          console.log('Hot Module Replacement (HMR) activated', shouldUpdate);
        }
      });
    }

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
