import { auth, db } from "./firebase.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const userNameEl = document.getElementById("user-name");
const userBalanceEl = document.getElementById("user-balance");
const userPointsEl = document.getElementById("user-points");
const rechargeBtn = document.getElementById("recharge-btn");

// تابع لتحديث عرض بيانات المستخدم
async function updateUserDisplay() {
    const user = auth.currentUser;
    if(!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()){
        const data = userSnap.data();
        userNameEl.textContent = "User: " + data.username;
        userBalanceEl.textContent = "Wallet: " + data.wallet + " EGY";
        userPointsEl.textContent = "Points: " + data.points;
    } else {
        // لو Document مش موجود، نضيفه تلقائي
        await setDoc(userRef, {
            username: user.email.split("@")[0],
            email: user.email,
            phone: "",
            points: 0,
            wallet: 0
        });
        updateUserDisplay(); // حدث العرض مرة ثانية بعد الإضافة
    }
}

// حماية الصفحة والتحقق من تسجيل الدخول
auth.onAuthStateChanged((user) => {
    if(user){
        updateUserDisplay();
    } else {
        alert("❌ يجب تسجيل الدخول أولاً!");
        window.location.href = "breakout.html";
    }
});
