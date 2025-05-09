// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import styles from "./ImageViewerManuel.module.scss";
// //- Örnek olarak yapılmıştır. Pages klasörü altına eklenirse çalışacaktır.

// const ImageViewerManuel = ({
//   imageName,
//   imagePath,
//   onClickAction,
//   isSmallSize,
// }) => {
//   return (
//     <>
//       {/* <img src={imagePath} alt={imageName} key={"img_" + imageName} width={240} onClick={onClickAction}/> */}
//       <div className={isSmallSize ? styles.smallSize : styles.standartSize}>
//         <Image
//           src={imagePath}
//           alt={imageName}
//           key={"img_" + imageName}
//           onClick={onClickAction}
//           layout="fill"
//           objectFit="contain"
//         />
//       </div>
//     </>
//   );
// };

// export default ImageViewerManuel;

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./ImageViewerManuel.module.scss";

const ImageViewerManuel = ({
  imageName,
  imagePath,
  onClickAction,
  isSmallSize,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={isSmallSize ? styles.smallSize : styles.standartSize}>
      {isLoading && <div className={styles.loader}></div>}
      <Image
        src={imagePath}
        alt={imageName}
        key={"img_" + imageName}
        onClick={onClickAction}
        layout="fill"
        objectFit="contain"
        onLoadingComplete={handleImageLoad}
      />
    </div>
  );
};

export default ImageViewerManuel;
