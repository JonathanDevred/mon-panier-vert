export function initializeLocalStorage() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }

  if (!localStorage.getItem("currentSession")) {
    localStorage.setItem("currentSession", JSON.stringify(null));
  }

  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
}

export const registerUser = (email: string, password: string): boolean => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const userExists = users.some((user: User) => user.email === email);

  if (userExists) return false;

  const newUser: User = { email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return true;
};

export const loginUser = (email: string, password: string): boolean => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find(
    (user: User) => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("currentSession", JSON.stringify(user));
    return true;
  }
  return false;
};

export const logoutUser = () => {
  localStorage.removeItem("currentSession");
};

export const getCurrentUser = (): User | null => {
  const currentUser = localStorage.getItem("currentSession");
  return currentUser ? JSON.parse(currentUser) : null;
};

export const updateUserEmail = (newEmail: string) => {
  const user = getCurrentUser();
  if (user) {
    user.email = newEmail;
    localStorage.setItem("currentSession", JSON.stringify(user));
    alert("Votre adresse e-mail a été mise à jour avec succès.");
  }
};

export const updateUserPassword = (newPassword: string) => {
  const user = getCurrentUser();
  if (user) {
    user.password = newPassword;
    localStorage.setItem("currentSession", JSON.stringify(user));
    alert("Votre mot de passe a été mis à jour avec succès.");
  }
};

export const deleteUserAccount = () => {
  localStorage.removeItem("currentSession");
  alert("Votre compte a été supprimé.");
};

export type User = {
  email: string; 
  password: string; 
};