import React, { useEffect, useState } from "react";
//- Örnek olarak yapılmıştır. Pages klasörü altına eklenirse çalışacaktır.

const ImageViewerManuel = ({ imageName, imagePath, onClickAction }) => {
  return (
    <>
        <img src={imagePath} alt={imageName} key={"img_" + imageName} width={240} onClick={onClickAction}/>
    </>
  );
};

export default ImageViewerManuel;
