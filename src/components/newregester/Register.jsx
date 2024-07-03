import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { db, storage } from "../../firebase"
import "./Register.css";

function Register({ register, setRegister }) {
  const navigation = useNavigate();

  const complete = async () => {
    try {
      const docRef = doc(db, 'users', register.tel); // 'users'はコレクション名、register.nameはドキュメントID
      await setDoc(docRef, register);
      navigation("/login/username");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegister(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
      if (e.target.files[0]){
        setImage(e.target.files[0]);
      }
    };

    const handleUpload = () => {
      if (!image) return;

      const storageRef = ref(storage,'images/${image.name}');
      const uploadTask = uploadBytesResumable(storageRef, image);
    

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            console.log("File available at", downloadURL);
          });
        }
      );
    }

  return (
    <div className="regi_background">
      <div className='regi_rectangle'>
        <h2 className='regi_title'>新規登録</h2>
        <table>
          <tbody>
            <tr>
              <td className='regi_item'>お名前</td>
              <td>
                <input
                  className='regi_input'
                  name='name'
                  value={register.name}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td className='regi_item'>フリガナ</td>
              <td>
                <input
                  className='regi_input'
                  name='furigana'
                  value={register.furigana}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td className='regi_item'>性別</td>
              <td>
                <input
                  type="radio"
                  className='man'
                  name='gender'
                  value='男性'
                  checked={register.gender === '男性'}
                  onChange={handleInputChange}
                />
                <label className='sexal'>男性</label>
                <input
                  type="radio"
                  className='woman'
                  name='gender'
                  value='女性'
                  checked={register.gender === '女性'}
                  onChange={handleInputChange}
                />
                <label className='sexal'>女性</label>
                <input
                  type="radio"
                  className='no_response'
                  name='gender'
                  value='回答しない'
                  checked={register.gender === '回答しない'}
                  onChange={handleInputChange}
                />
                <label className='sexal'>回答しない</label>
              </td>
            </tr>
            <tr>
              <td className='regi_item'>電話番号</td>
              <td>
                <input
                  className='regi_input'
                  name='tel'
                  value={register.tel}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td className='regi_item'>パスワード</td>
              <td>
                <input
                  className='regi_input'
                  name='password'
                  type='password'
                  value={register.password}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p className='regi_attach'>＜顔写真の添付＞</p>
        <input type="file" className='regi_picture' onChange = {handleChange}/>
        <progress value ={progress} max = {"100"}/>
        {url && <img src={url} alt="Uploaded" style = {{width: '100px', height:'auto'}}/>}
        <button className='regi_button' onClick={handleUpload}>登録</button>
{/* {complete} */}
        

      </div>
    </div>
  );
}

export default Register;
