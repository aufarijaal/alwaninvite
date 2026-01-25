export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();
  
  // If user is logged in and trying to access auth pages, redirect to dashboard
  if (user.value && to.path.startsWith('/auth')) {
    return navigateTo("/dashboard");
  }
  
  // If user is not logged in and trying to access dashboard, redirect to signin
  if (!user.value && to.path.startsWith('/dashboard')) {
    return navigateTo("/auth/signin");
  }
});
