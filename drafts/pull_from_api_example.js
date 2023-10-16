// import { useRouter } from "next/router";
// import { useCallback, useEffect, useState } from "react";
// import Image from "next/image";

// const HomePage = () => {
//   const [userInfo, setUserInfo] = useState([]);
//   useEffect(() => {
//     const getData = async () => {
//       const query = await fetch("https://jsonplaceholder.typicode.com/users");
//       const response = await query.json();
//       console.log("response from api:" + response);
//       setUserInfo(response);
//     };
//     getData();
//   }, []);

//   return (
//     <div>
//       <h1>Test</h1>
//       {userInfo &&
//         userInfo.length &&
//         userInfo?.map((user, index) => {
//           console.log(index);
//           return (
//             <>
//               <h4 key={user.id}>{user.name}</h4>
//             </>
//           );
//         })}
//     </div>
//   );
// };
// export default HomePage;