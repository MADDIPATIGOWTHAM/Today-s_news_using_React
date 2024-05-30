import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import './google.css';
function SignInwithGoogle() {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        const user = result.user;
        if (result.user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: user.displayName,
            photo: user.photoURL,
            lastName: "",
          });
          toast.success("User logged in Successfully", {
            position: "top-center",
          });
          window.location.href = "/profile";
        }
      })
      .catch((error) => {
        if (error.code === "auth/cancelled-popup-request") {
          toast.error("Authentication cancelled. Please try again.", {
            position: "top-center",
          });
        } else {
          console.error(error);
          toast.error("An error occurred. Please try again.", {
            position: "top-center",
          });
        }
      });
  }
  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div className="google-btn" onClick={googleLogin}>
        <img src={require("../google.png")} alt="Google Logo" />
      </div>
    </div>
  );
}

export default SignInwithGoogle;