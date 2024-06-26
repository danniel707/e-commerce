import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged } from 'firebase/auth';
import {getFirestore, 
        doc, 
        getDoc, 
        setDoc, 
        collection, 
        writeBatch,
        orderBy,
        query,
        getDocs} from 'firebase/firestore'
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB7k5uBdE5AIZRSsWsMdnFOz3wiMbfU2y0",
  authDomain: "e-commerce-55979.firebaseapp.com",
  projectId: "e-commerce-55979",
  storageBucket: "e-commerce-55979.appspot.com",
  messagingSenderId: "104255154918",
  appId: "1:104255154918:web:bc78741a4743414e7fa927"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore(); 

export const addCollectionAndDocuments = async (collectionkey, objectsToAdd) => {
  const collectionRef = collection(db, collectionkey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    console.log(object)
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('Done')
}

export const getCategoriesDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  //await Promise.reject(new Error('new error'))
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  
}

export const getDirectoryDocuments = async () => {
  const collectionRef = collection(db, 'directory');
  const q = query(collectionRef, orderBy('id'));

  //await Promise.reject(new Error('new error'))
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  
}

export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {} 
  ) => {
  
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error){
      console.log('error creating the user', error.message);  
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
        (userAuth) => {
          unsubscribe();
          resolve(userAuth);
        },
        reject
    )
  })
}