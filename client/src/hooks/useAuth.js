export function useAuth() {
  const user = JSON.parse(localStorage.getItem("user"));

    console.log(user)
  return {
    isAuthenticated: !!user,
    user,
    role: user?.role,
  };
}