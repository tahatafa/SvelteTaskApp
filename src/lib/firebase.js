// place files you want to import through the `$lib` alias in this folder.
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDawAuPNg1JguTs-4JP29Rn3pnP81KO-0c",
    authDomain: "task-app-1939f.firebaseapp.com",
    projectId: "task-app-1939f",
    storageBucket: "task-app-1939f.appspot.com",
    messagingSenderId: "216699945199",
    appId: "1:216699945199:web:4bb2ddec282494921d9b1a",
    measurementId: "G-C3C34W7157"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of tasks from your database
export async function getTasks() {
    const tasksCollection = collection(db, 'tasks');
    const tasksSnapshot = await getDocs(tasksCollection);
    const tasksList = tasksSnapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    });
    return tasksList;
}

export async function addTaskToDatabase(task) {
    const taskRef = await addDoc(collection(db, "tasks"), task)
}

export async function updateTask(task) {
    const docRef = doc(db, `tasks/${task.id}`)
    const taskRef = await updateDoc(docRef, task)
}

export async function delTask(task) {
    const docRef = doc(db, `tasks/${task.id}`)
    await deleteDoc(docRef)
}