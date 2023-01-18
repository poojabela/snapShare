import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdhl_N6lZnvlXlHnO_8u9hB5C5PU4b9Do",
  authDomain: "social-eaff9.firebaseapp.com",
  projectId: "social-eaff9",
  storageBucket: "social-eaff9.appspot.com",
  messagingSenderId: "98233605416",
  appId: "1:98233605416:web:0ba6dde369fe5b0d1ec41d"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)