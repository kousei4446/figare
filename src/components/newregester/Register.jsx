import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../../firebase"
import "./Register.css";

function Register({ register, setRegister }) {
  const navigation = useNavigate();

  const complete = async () => {
    try {
      const docRef = doc(db, 'users', register.tel); // 'users'はコレクション名、register.nameはドキュメントID
      await setDoc(docRef, register);
      console.log("Document written with ID: ", register.name);
      navigation("/login/username");
      setRegister({tel:"",password:"",gender:"",name:"",furigana:""})
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
        <input type="file" className='regi_picture' />
        <button className='regi_button' onClick={complete}>登録</button>
      </div>
    </div>
  );
}

export default Register;
