
import { supabase } from "./supabase.js";

const form = document.getElementById("signup-form");
const message = document.getElementById("message");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const fullName = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  message.textContent = "جارٍ إنشاء الحساب...";

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo:
        "https://ghaethgamal.github.io/queen-preview/"
    }
  });

  if (error) {
    message.textContent = error.message;
    return;
  }

  message.textContent = data.session
    ? "تم إنشاء الحساب بنجاح!"
    : "تم إرسال رابط التحقق إلى بريدك الإلكتروني. تحقق من بريدك لتفعيل الحساب.";
});
