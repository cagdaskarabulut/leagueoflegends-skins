import Head from "next/head";
import React, { Component } from "react";
import { useRouter } from "next/router";

//- Google için meta sayfası
const MetaPanel = ({
  title, descriptionContent, keywordsContent, authorContent, isDontFollowByRobots , imagePath, imageAlt
}) => {
  const router = useRouter();
  let siteName = "Arabulucuyuz";
  let siteUrl = "https://www.arabulucuyuz.org";
  
  let currentFullPathUrl = siteUrl + router.asPath;
  let imageFullPathUrl = siteUrl + imagePath;
  let iconHref = siteUrl + "/images/Arabulucu-icon.png";
  authorContent = (authorContent == null || authorContent == "") ? "Öznur İlhan Karabulut" : authorContent;
  return (
    <Head>

      {(title != null && title != "") && (
        <>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta data-rh="true" property="og:title" content={title} />
          <meta data-rh="true" property="twitter:title" content={title} />
        </>
      )}

      {(descriptionContent != null && descriptionContent != "") && (
        <>
          <meta name="description" content={descriptionContent} />
          <meta data-rh="true" property="og:description" content={descriptionContent} />
          <meta data-rh="true" property="twitter:description" content={descriptionContent} />
        </>
      )}

      {(keywordsContent != null && keywordsContent != "") && (
        <>
          <meta name="keywords" content={keywordsContent} />
          <meta name="og:keywords" content={keywordsContent} />
        </>
        )
      }

      {(authorContent != null && authorContent != "") && (
        <>
          <meta name="author" content={authorContent} />
          <meta data-rh="true" property="article:author" content={authorContent} />
        </>
      )}

      {(siteName != null && siteName != "") && (
        <>
          <meta data-rh="true" property="og:site_name" content={siteName} />
          <meta name="application-name" content={siteName} />
        </>
      )}

      {(currentFullPathUrl != null && currentFullPathUrl != "") && (
        <>  
          <meta data-rh="true" property="og:url" content={currentFullPathUrl} />
          <meta data-rh="true" property="al:web:url" content={currentFullPathUrl} />
          <meta property="og:image:secure_url" content={currentFullPathUrl} />
          <link data-rh="true" rel="canonical" href={currentFullPathUrl} />
        </>
      )}

      {isDontFollowByRobots && (<meta name="robots" content="noindex,nofollow" />)}
      {!isDontFollowByRobots && (<meta name="robots" content="index,follow" />)}

      {(imagePath != null && imagePath != "") && (<meta property="og:image" content={imageFullPathUrl} itemProp="image" />)}
      {(imageAlt != null && imageAlt != "") && (<meta property="og:image:alt" content={imageAlt} />)}
      <link rel="icon" href={iconHref} />

      <meta name="google-site-verification" content="ZqEtWJqvbP4hrjZXAHOhtMDausn70UMrPIHHIMQORDk" />
      <meta name="yandex-verification" content="482b1df21423a716" />
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,maximum-scale=1" />
      <meta name="Language" content="tr" />
      <meta property="og:locale" content="tr_TR" />
      <meta name="twitter:app:country" content="TR" />
      <meta name="doc-type" content="Web Page" />
      <meta name="doc-class" content="Published" />
      <meta name="doc-rights" content="Public" />
      <meta property="og:type" content="website" />
      <meta httpEquiv="Copyright" content="Copyright 2023 Arabulucuyuz.org" />
      <meta httpEquiv="Reply-to" content="oznurilhan@windowslive.com" />
      <meta name="mobile-web-app-capable" content="yes" />
    </Head>
  );
};

export default MetaPanel;
