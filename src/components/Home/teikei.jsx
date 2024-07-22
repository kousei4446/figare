import { arrayUnion, doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";



export const teikeibun="こんにちわ。R&D事務室の田沼です。そちらに似た落とし物をお預かりしている可能性があるのでそちらの都合のいい時間にに受け取りに来てください。"
export async function teikei(post){
    // const navigation=useNavigate()
    console.log(post)
        const UID = localStorage.getItem("uid");
        const userDocRef = doc(db, "googleusers", post.poster);
        const userDocSnap = await getDoc(userDocRef);
        const myUserInfo = userDocSnap.data();

        const docRefss = doc(db, "userChats", UID);
        const docSnapss = await getDoc(docRefss);

        if (docSnapss.exists()) {
            await updateDoc(docRefss, {
                [post.id]: {
                    date: Timestamp.now(),
                    userInfo: {
                        postIcon: post.file,
                        // photoURL: myUserInfo.photoURL,
                        uid: post.poster,
                        username: myUserInfo.username,
                    },
                },
            });
        } else {
            await setDoc(docRefss, {
                [post.id]: {
                    date: Timestamp.now(),
                    userInfo: {
                        postIcon: post.file,
                        // photoURL: myUserInfo.photoURL,
                        uid: post.poster,
                        username: myUserInfo.username,
                    },
                },
            });
        }

        const hisDocRef = doc(db, "userChats", post.poster);
        const hisDocSnap = await getDoc(hisDocRef);
        const hisUserDocRef = doc(db, "googleusers", UID);
        const hisUserDocSnap = await getDoc(hisUserDocRef);
        const hisUserInfo = hisUserDocSnap.data();

        if (hisDocSnap.exists()) {
            await updateDoc(hisDocRef, {
                [post.id]: {
                    date: Timestamp.now(),
                    userInfo: {
                        postIcon: post.file,
                        // photoURL: hisUserInfo.photoURL,
                        uid: UID,
                        username: hisUserInfo.username,
                    },
                },
            });
        } else {
            await setDoc(hisDocRef, {
                [post.id]: {
                    date: Timestamp.now(),
                    userInfo: {
                        postIcon: post.file,
                        photoURL: hisUserInfo.photoURL,
                        uid: UID,
                        username: hisUserInfo.username,
                    },
                },
            });
        }

        const chatPairId = post.id + UID + post.poster;
        const chatPairIds = post.id + post.poster + UID;
        localStorage.setItem("chatpair", chatPairId);

        const docRef = doc(db, 'chats', chatPairId);
        const docRefs = doc(db, 'chats', chatPairIds);

        const docSnap = await getDoc(docRef);
        const docSnaps = await getDoc(docRefs);

        if (docSnap.exists()) {
            await updateDoc(docRef, {
                message: arrayUnion({ date: Timestamp.now(), sender: UID, text: teikeibun, checked: false })
            });
            localStorage.setItem("chatpair", chatPairId);
        } else if (docSnaps.exists()) {
            await updateDoc(docRefs, {
                message: arrayUnion({ date: Timestamp.now(), sender: UID, text: teikeibun, checked: false })
            });
            localStorage.setItem("chatpair", chatPairIds);
        } else {
            await setDoc(docRef, {
                message: [{ date: Timestamp.now(), sender: UID, text: teikeibun, checked: false }]
            });
            localStorage.setItem("chatpair", chatPairId);
        }

        // navigation("/login/home/chat");
}