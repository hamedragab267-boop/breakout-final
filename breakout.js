import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    const messageBox = document.createElement("div");
    messageBox.style.marginTop = "10px";
    messageBox.style.color = "#228B22";
    document.body.appendChild(messageBox);

    // 🔹 SIGN UP
    signupForm?.addEventListener("submit", async function(e){
        e.preventDefault();
        const username = signupForm.elements["txt"].value.trim();
        const email = signupForm.elements["email"].value.trim();
        const phone = signupForm.elements["broj"].value.trim();
        const password = signupForm.elements["pswd"].value.trim();
        if(!username || !email || !password){ messageBox.textContent = "من فضلك املأ جميع الحقول"; return; }
        messageBox.textContent = "جاري التسجيل…";

        try {
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;

            // تحديث displayName
            await updateProfile(user, { displayName: username });

            // تخزين بيانات المستخدم في Firestore
            await setDoc(doc(db,"users",user.uid),{
                username, email, phone, wallet:0, points:0, pendingTopUp:0, createdAt:serverTimestamp()
            });

            messageBox.textContent = "تم التسجيل!";
            window.location.href = "home.html";

        } catch (error){
            messageBox.textContent = error.code==="auth/email-already-in-use" ? "هذا الميل مستخدم بالفعل!" : "خطأ: "+error.message;
        }
    });

    // 🔹 LOGIN
    loginForm?.addEventListener("submit", async function(e){
        e.preventDefault();
        const email = loginForm.elements["email"].value.trim();
        const password = loginForm.elements["pswd"].value.trim();
        if(!email || !password){ messageBox.textContent = "من فضلك املأ كل الحقول"; return; }

        try{
            await signInWithEmailAndPassword(auth,email,password);
            window.location.href = email==="breakout2163@gmail.com" ? "dashboard.html" : "home.html";
        } catch(error){
            messageBox.textContent = "البريد أو كلمة المرور خطأ";
        }
    });
});
