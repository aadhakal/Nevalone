import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, deleteDoc, getDocs, collection} from 'firebase/firestore';
import{ environment } from 'src/environments/environment';
import { getAuth} from 'firebase/auth';

const app = initializeApp(environment.firebase);
export const db = getFirestore(app);
const auth = getAuth(app);



export const getCurrentUser = () => {
  return auth.currentUser;
}

export async function addnewUser(uid: string, email: string, password: string, name: string) {
  const userRef = doc(db, 'users', uid);
  const userData = {
    email,
    password, // Storing password in Firestore is a security concern. Avoid doing this if possible.
    name,
  };
  await setDoc(userRef, userData);
}


export async function createUserDocument(uid: string, data: any) {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, data);
}

export const getUserProfile = async (userId: string) => {
//   const userRef = doc(db, 'users', userId);
const userRef = doc(db, 'users', userId);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    throw new Error('User not found');
  }

  return userSnapshot.data();
};

export const updateUserProfile = async (userId: string, updatedData: any) => {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, updatedData, { merge: true });
};

export const deleteUserProfile = async (userId:string) => {
  auth.currentUser?.delete();
  const userRef = doc(db, 'users',userId );
  await deleteDoc(userRef);
};

export const deactivateUserProfile = async (userId: string) => {

};
// Add other Firebase utility functions as needed...

const collectionRef = collection(db, 'letters');

export const getLetters = async (letterId: string) => {
  const letterSnapshot = await getDocs(collectionRef);
  const dataArr = letterSnapshot.docs.map(doc => doc.data());
  return dataArr;
}

