import Head from "next/head";
import { useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { DefaultSeo } from "next-seo";

import { screen } from "ui/screen";
import { responsive } from "ui/responsive";
import { AuthProvider } from "components/auth";
import { useEffect } from "react";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    background:#000;
  }
  
  * {
    box-sizing: border-box;
  }

  figure {
    margin: 0;
  }
`;

const theme = {
  screen,
  responsive,
  styles: {
    borderRadius: "12px",
  },
  colors: {
    primary: "#0070f3",
    productBg: "#f6f6f6",
  },
};

export default function App({ Component, pageProps }) {
  /**
   * Customise these values to match your site
   * Read more here: https://github.com/garmeeh/next-seo#default-seo-configuration
   */
  const SEOSettings = {
    // openGraph: {
    //   type: 'website',
    //   locale: locale.appLanguage,
    //   url: 'https://www.url.ie/',
    //   site_name: 'SiteName'
    // },
    // twitter: {
    //   handle: '@handle',
    //   site: '@site',
    //   cardType: 'summary_large_image'
    // }
  };

  // Expose 1vh unit as 1% of innerHeight, cap to screen.availHeight.
  const [vh, setVh] = useState(1000);
  useEffect(() => {
    function set() {
      let height = window.innerHeight;
      if (height > window.screen.availHeight) {
        height = window.screen.availHeight;
      }
      setVh(height / 100);
    }
    set();

    addEventListener("resize", set);
    return () => removeEventListener("resize", set);
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <DefaultSeo {...SEOSettings} />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <div style={{ "--vh": `${vh}px` }}>
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
