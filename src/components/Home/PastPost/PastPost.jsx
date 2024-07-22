import React, { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { db } from '../../../firebase';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import './PastPost.css';
import DeleteModal from './DeleteModal';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function PastPost() {
    const [myPostList, setMyPostList] = useState([]);
    const [confirm, setConfirm] = useState(false);
    const [id, setId] = useState("");
    const [storagePath, setStoragePath] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyPost = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, 'Posts'), orderBy('time', 'desc'));
                const querySnapshot = await getDocs(q);
                const postList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                const myPost = postList.filter((post) => post.poster === localStorage.getItem("uid"));
                setMyPostList(myPost);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyPost();
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("uid")) {
            navigate("/");
        }
    }, [navigate]);

    const deleteBtn = async (id, storagePath) => {
        try {
            const storage = getStorage();
            const desertRef = ref(storage, storagePath);
            await deleteObject(desertRef);
            const delDocRef = doc(db, "Posts", id);
            await deleteDoc(delDocRef);
            setMyPostList(myPostList.filter(post => post.id !== id));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    return (
        <>
            {loading ?
                <>
                    <div className='background' style={{ justifyContent: "space-between" }}>
                        <p onClick={() => navigate("/login/home")} style={{ display: "flex", alignItems: "center", color: "white" }}>
                            <IoMdArrowRoundBack size="20px" />戻る
                        </p>
                        <h3 style={{ color: "white" }}>過去の投稿一覧</h3>
                        <div></div>
                    </div>
                    <div className='load'>
                        <h3>データを取得中</h3>
                        <div className='loader'></div>
                    </div>
                </>
                :
                <div className='past-post-container'>
                    {confirm && <DeleteModal setConfirm={setConfirm} deleteBtn={deleteBtn} id={id} storagePath={storagePath} />}
                    <div className='background' style={{ justifyContent: "space-between" }}>
                        <p onClick={() => navigate("/login/home")} className='pastpost-back'>
                            <IoMdArrowRoundBack className='pastpost-back-icon' />戻る
                        </p>
                        <h3 className='pastpost-title'>過去の投稿一覧</h3>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        <div className='pastpostcard'></div>
                        <div className='past-post'>
                            {myPostList.map((post) => (
                                <div className='main-post' style={{width:"93vw"}}>
                                    <div className='main-postcard'>
                                        <img src={post.file} className='postimg' alt='Post' />
                                        <div className='post-void'></div>
                                        <div className='post-main'>
                                            <div className='post-username'>
                                                <div>{post.userImg &&
                                                    <img src={post.userImg} alt="User" />}
                                                </div>
                                            </div>
                                            <div className='post-text' id="post-textId">{post.text.length > 50 ? `${post.text.slice(0, 50)}....` : post.text}</div>

                                            <div className='post-time'>
                                                {/* <p>{post.poster === localStorage.getItem("uid") && "※これは自分の投稿です"}</p> */}
                                            </div>
                                            <div className='past-delbtn'>
                                                <button className='delbtn' onClick={() => {
                                                    setConfirm(true);
                                                    setId(post.id);
                                                    setStoragePath(post.storagePath);
                                                }}>削除</button>
                                            </div>
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
