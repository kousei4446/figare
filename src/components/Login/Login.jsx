// import React, { useState } from 'react';
// import { storage, db } from '../../firebase'; // Firebaseの設定ファイルからインポート
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { collection, addDoc } from 'firebase/firestore';

// function Login() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!file) return;
//     const storageRef = ref(storage, `images/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         // Progress function
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//       },
//       (error) => {
//         // Error function
//         console.error('Upload failed:', error);
//       },
//       () => {
//         // Complete function
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log('File available at', downloadURL);
//           saveImageURL(downloadURL);
//         });
//       }
//     );
//   };

//   const saveImageURL = async (url) => {
//     try {
//       await addDoc(collection(db, 'images'), {
//         imageUrl: url,
//       });
//       console.log('Image URL saved to Firestore');
//     } catch (e) {
//       console.error('Error adding document: ', e);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// }

// export default Login;

import React from 'react'

function Login() {
  return (
    <div>Login</div>
  )
}

export default Login