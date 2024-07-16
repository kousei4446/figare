import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import anime from 'animejs/lib/anime.es.js';
import PrivateModeWarning from './PrivateModeWarning';

function Navigation() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const container = document.querySelector('.rogContainer');
        if (container) {
            for (let i = 0; i <= 50; i++) {
                const blocks = document.createElement('div');
                blocks.classList.add('block');
                container.appendChild(blocks);
            }
        }

        const animateBlocks = () => {
            anime({
                targets: '.block',
                translateX: () => anime.random(-600, 600),
                translateY: () => anime.random(-700, 700),
                scale: () => anime.random(1, 7),
                duration: 5000,
                delay: anime.stagger(10, { start: 1000 }),
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutQuad',
            });
        };
        animateBlocks();
    }, [location.pathname]);

    useEffect(() => {
        setIsOpenModal(true);
    }, []);

    // /login パス以降の場合はナビゲーションを表示しない
    if (location.pathname.startsWith('/login')) {
        return null;
    }

    /* googleログイン */
    function SignInButton() {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account',
        });

        const signInWithGoogle = () => {
            const auth = getAuth();
            signInWithPopup(auth, provider)
                .then(async (result) => {
                    const user = result.user;
                    const userData = {
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL
                    };
                    localStorage.setItem("uid", user.uid);
                    const db = getFirestore();
                    const docRef = doc(db, 'googleusers', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        await updateDoc(docRef, userData);
                    } else {
                        await setDoc(docRef, userData);
                    }
                    const UID = localStorage.getItem("uid");
                    const docRefw = doc(db, "googleusers", UID);
                    const docSnapw = await getDoc(docRefw);
                    let data = docSnapw.data();
                    if (data.place) {
                        navigate('/login/home');
                    } else {
                        navigate("/login/serchplace");
                    }
                })
                .catch((error) => {
                    console.log('signin error', error);
                });
        };

        return (
            <button className='rogButton' onClick={signInWithGoogle}>
                <p> Googleでサインイン</p>
            </button>
        );
    }

    return (
        <>
            <div className='rogContainer'>
                {isOpenModal && <PrivateModeWarning setIsOpenModal={setIsOpenModal} />}
                <h2 className="rogTitle">Figare</h2>
                <nav className='mainlogin'>
                    <SignInButton />
                </nav>
            </div>
        </>
    );
}

export default Navigation;
