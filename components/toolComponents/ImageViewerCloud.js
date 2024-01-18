import React, { useEffect, useState } from "react";
//- Örnek olarak yapılmıştır. Pages klasörü altına eklenirse çalışacaktır.
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";

const ImageViewer = ({ imageName, imagePath }) => {

  const [url, setUrl] = useState(null);
  const imageRef = ref(storage,imagePath);
  
  useEffect(() => {
    getDownloadURL(imageRef)
      .then((url) => {
        setUrl(url);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      {url && <img src={url} alt={imageName} key={"img"+imageName} width={240} />}
    </>
  );
}

export default ImageViewer;
