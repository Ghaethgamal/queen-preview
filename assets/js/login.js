
import { supabase } from "./supabase.js";

const form = document.getElementById("login-form");
const message = document.getElementById("message");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  message.textContent = "جارٍ تسجيل الدخول...";

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    message.textContent = error.message;
    return;
  }

  window.location.href =
    "https://ghaethgamal.github.io/queen-preview/dashboard.html";
});
