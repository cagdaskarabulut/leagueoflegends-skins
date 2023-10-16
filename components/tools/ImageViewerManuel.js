import Image from "next/image";
import React, { useEffect, useState } from "react";
//- Örnek olarak yapılmıştır. Pages klasörü altına eklenirse çalışacaktır.

const ImageViewerManuel = ({ imageName, imagePath, onClickAction }) => {
  return (
    <>
        {/* <img src={imagePath} alt={imageName} key={"img_" + imageName} width={240} onClick={onClickAction}/> */}
        <div style={{width: '200px', height: '200px', position: 'relative'}}>
          <Image
          src={imagePath} alt={imageName} key={"img_" + imageName}  onClick={onClickAction}
            layout='fill'
            objectFit='contain'
          />
        </div>
    </>
  );
};

export default ImageViewerManuel;
