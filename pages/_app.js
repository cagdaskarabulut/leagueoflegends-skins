import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";

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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8764830534484668"
          crossorigin="anonymous"
        ></script>

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




        {/* Yandex Ads - Start       */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.yaContextCb=window.yaContextCb||[]
            `,
          }}
        />
        <script src="https://yandex.ru/ads/system/context.js" async></script>
        {/* Yandex Ads - End       */}



      </Head>



      {/* Google Analytics - Start */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      {/* Google Analytics - End */}




      {/* Yandex Ads - Start */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.yaContextCb.push(()=>{
              Ya.Context.AdvManager.render({
                "blockId": "R-A-3762197-1",
                "type": "floorAd",
                "platform": "desktop"
              })
            })
            `,
        }}
      />
      {/* Yandex Ads - End */}


      

      <Component {...pageProps} />
    </>
  );
};

export default App;
