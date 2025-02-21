import { app, db } from "./firebase";
import { collection, addDoc, setDoc, getDocs, doc } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export const signout = async () => {
    await signOut(auth);
    console.log('Signed Out');
    
}

export const LogIn = async (data)=>{
    let res = null;
    try{
        res = await signInWithEmailAndPassword(auth, data.email, data.password)
    }
    catch(error){
        console.log(error.message)
    }
    console.log('res', res)
    if(res && res.user) return res.user;
    else return null
}

export const signUp = async (data) => {
    let res = null;
    console.log('res', res)
    try {
        res = await createUserWithEmailAndPassword(auth, data.email, data.password);
        console.log('User Created')

        if(res.user){
            const docu = doc(db, 'users', res.user.uid);
            await setDoc(docu, {
                name: data.name,
                email: res.user.email,
                phone: '',
                jid: '',
                aadhar: '',
                tckid: ''
            })
        }
    }
    catch(error){
        console.log(error.message)
    }

    if(res && res.user) return res.user;
    else return res;
}

