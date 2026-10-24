
import { supabase } from "./supabase.js";

const message = document.getElementById("message");
const nameElement = document.getElementById("user-name");
const emailElement = document.getElementById("user-email");
const logoutButton = document.getElementById("logout-button");
const profileForm = document.getElementById("profile-form");
const fullNameInput = document.getElementById("full-name");

async function loadDashboard() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    window.location.href =
      "https://ghaethgamal.github.io/queen-preview/login.html";
    return;
  }

  const user = data.user;

  if (emailElement) emailElement.textContent = user.email || "";

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const fullName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    "مستخدم QUEEN";

  if (nameElement) nameElement.textContent = fullName;
  if (fullNameInput) fullNameInput.value = fullName;
}

profileForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const { data, error: userError } = await supabase.auth.getUser();

  if (userError || !data.user) {
    message.textContent = "يرجى تسجيل الدخول مجددًا.";
    return;
  }

  const fullName = fullNameInput.value.trim();

  if (!fullName) {
    message.textContent = "يرجى إدخال الاسم.";
    return;
  }

  message.textContent = "جارٍ حفظ التغييرات...";

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", data.user.id);

  if (error) {
    message.textContent = "تعذر حفظ الاسم: " + error.message;
    return;
  }

  await supabase.auth.updateUser({
    data: { full_name: fullName }
  });

  if (nameElement) nameElement.textContent = fullName;
  message.textContent = "تم تحديث الاسم بنجاح.";
});

logoutButton?.addEventListener("click", async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    if (message) message.textContent = error.message;
    return;
  }

  window.location.href =
    "https://ghaethgamal.github.io/queen-preview/login.html";
});

loadDashboard();
