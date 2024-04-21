
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAVBkiw1ILa7wGfmDRM_FoK0SopkU56EgM",
    authDomain: "seasos-ciencias.firebaseapp.com",
    projectId: "seasos-ciencias",
    storageBucket: "seasos-ciencias.appspot.com",
    messagingSenderId: "1083035773706",
    appId: "1:1083035773706:web:b081fba6404690d68c28f3",
    measurementId: "G-MP1J8627KH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

export async function uploadFiles(file) {
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}

export const firestore = getFirestore(app);