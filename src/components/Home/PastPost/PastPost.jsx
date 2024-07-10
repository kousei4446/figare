import React, { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { db } from '../../../firebase';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import './PastPost.css';
import DeleteModal from './DeleteModal';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function PastPost() {
    const [myPostList, setMyPostList] = useState([]);
    const [confirm, setConfirm] = useState(false);
    const [id, setId] = useState("");
    const [storagePath, setStoragePath] = useState("");
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()

    useEffect(() => {
        const fetchMyPost = async () => {
            setLoading(true)
            try {
                const q = query(collection(db, 'Posts'), orderBy('time', 'desc'));
                const querySnapshot = await getDocs(q);
                const postList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                const myPost = postList.filter((post) => post.poster === localStorage.getItem("uid"));
                setMyPostList(myPost);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
            finally {
                setLoading(false)
            }
        };

        fetchMyPost();
    }, []);

    const deleteBtn = async (id, storagePath) => {
        try {
            const storage = getStorage();
            const desertRef = ref(storage, storagePath); // ここでファイルパスを指定します
            await deleteObject(desertRef);
            const delDocRef = doc(db, "Posts", id);
            await deleteDoc(delDocRef);
            setMyPostList(myPostList.filter(post => post.id !== id));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const editBtn = () => {
        // 編集ボタンの機能をここに実装します
    };

    return (
        <>
            {loading ?
                <>
                    <div className='background'>
                        <h3 style={{ textAlign: "center" }}>過去の投稿一覧</h3>
                    </div>
                    <div className='load'>
                        <h3>データを取得中</h3>
                        <div className='loader'></div>
                    </div>
                </>
                :
                <div className='past-post-container'>
                    {confirm && <DeleteModal setConfirm={setConfirm} deleteBtn={deleteBtn} id={id} storagePath={storagePath} />}
                    <div className='background'>
                        <h3 style={{ textAlign: "center" }}>過去の投稿一覧</h3>
                    </div>
                    <div>
                        <div className='pastpostcard'>
                            <p onClick={() => navigation("/login/home")} style={{ display: "flex", alignItems: "center" }}><IoMdArrowRoundBack size="20px" />戻る</p>
                        </div>
                        <div className='pastpost'>
                            {myPostList.map((post) => (
                                <div key={post.id} className='post-item'>
                                    <div className='post-main'>
                                        <img src={post.file} width='130px' alt='Post' className='postimg' />
                                        <div className='place-and-toku'>
                                            <div>
                                                <p className='place'>{post.place}</p>
                                            </div>
                                            <p>{post.text}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0px 10px" }}>
                                        <p>{post.time.toDate().toLocaleString()}</p>
                                        <div>
                                            <button onClick={() => {
                                                setConfirm(true);
                                                setId(post.id);
                                                setStoragePath(post.storagePath); // ここで正しい画像パスを設定します
                                            }}>削除</button>
                                            <button onClick={() => editBtn()}>編集</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <br />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default PastPost;
