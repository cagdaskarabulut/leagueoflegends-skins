import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";
// import { Dancing_Script } from "@next/font/google";
// const dancingScript = Dancing_Script({
//   subsets: ["latin"],
// });
// import { Pacifico } from "@next/font/google";
// const pacifico = Pacifico({
//   subsets: ["latin"],
//   weight: ['400']
// });
// import { Permanent_Marker } from "@next/font/google";
// const permanentMarker = Permanent_Marker({
//   subsets: ["latin"],
//     weight: ['400']
// });

import { Roboto } from "@next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
    weight: ['700']
});

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        {/* Google Ads - Start */}
        {/* Google Adsense */}
        {/* google adsense its enough for automatically adding ads */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src= "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8764830534484668"
        />
        {/* Google Ads - End */}
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        {/* Google - End */}
      </Head>

      {/* Google Analytics - Start */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      {/* Google Analytics - End */}

      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default App;
