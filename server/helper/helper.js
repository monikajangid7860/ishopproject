const Razorpay = require("razorpay");

/* ================= UNIQUE IMAGE NAME ================= */
function uniqueImageName(imageName) {

  const now = new Date();
  const dateTime =
    now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getDate().toString().padStart(2, "0") +
    "_" +
    now.getHours().toString().padStart(2, "0") +
    now.getMinutes().toString().padStart(2, "0") +
    now.getSeconds().toString().padStart(2, "0");

  const randomNum = Math.floor(Math.random() * 100000);

  return `${dateTime}_${randomNum}_${imageName}`;
}

/* ================= RAZORPAY INSTANCE ================= */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
console.log("RAZORPAY KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY SECRET EXISTS:", !!process.env.RAZORPAY_KEY_SECRET);
console.log("INIT KEY:", process.env.RAZORPAY_KEY_ID);
console.log("INIT SECRET:", process.env.RAZORPAY_KEY_SECRET);

/* ================= EXPORTS ================= */
module.exports = {
  razorpay,
  uniqueImageName,
};
