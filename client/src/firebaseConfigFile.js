import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth'

const {VITE_API_KEY,VITE_AUTH_DOMAIN,VITE_PROJECT_ID,VITE_STORAGE_BUCKET,VITE_MESSAGING_SENDER_ID,VITE_APP_ID,VITE_MEASUREMENT_ID}=import.meta.env
const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};

export function recaptcha(){
// alert(VITE_IRSHAD)
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible',
    'callback': () => {
      // onSignInSubmit();
    },
    'expired-callback': () => {
      // Response expired. Ask user to solve reCAPTCHA again.
      // ...
    }
  }, auth);
}
export  function onSignInSubmit(code,phone){
  recaptcha()
  return new Promise((resolve,reject)=>{
    signInWithPhoneNumber(auth, code+phone, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      resolve()
    }).catch((err) => {
      alert(err)
      reject(err)
    })
  })
}

export function verify(otp){
  return new Promise((resolve,reject)=>{
    window.confirmationResult.confirm(otp).then(() => {
      resolve()
    }).catch((err) => {
      reject(err)
    });
  })
}