import React, { useEffect, useState } from "react";
//- Örnek olarak yapılmıştır. Pages klasörü altına eklenirse çalışacaktır.
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase";

function TestStorage() {
  const [url, setUrl] = useState(null);
  const imageRef = ref(storage,"images/image-test");

  useEffect(() => {
    // console.log("imageRef:"+imageRef);
    getDownloadURL(imageRef)
      .then((url) => {
        setUrl(url);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <h1>Firestore / Firebase Storage Test Page</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.currentTarget.files[0];
          uploadBytes(imageRef, file);
        }}
      />

      {url && <img src={url} alt="some" width={240} />}
    </div>
  );
}

export default TestStorage;
