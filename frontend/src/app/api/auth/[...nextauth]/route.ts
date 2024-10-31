// ¿Por qué tantas carpetas? Porque NextAuth necesita saber donde estan las credenciales de Google y es la ruta que NextAuth necesita para funcionar.
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
    // Aca le decimos que use estas credenciales para hablar con Google
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Agregamos configuración de páginas y manejo de errores
  pages: {
    signIn: '/login',
    error: '/login', // Redirige a login en caso de error
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        return true; // Permite el login
      }
      return false; // Rechaza otros providers
    },
  },
});
// Esto es como decir "cuando alguien intente hacer login, usa esta configuracion"
export { handler as GET, handler as POST };