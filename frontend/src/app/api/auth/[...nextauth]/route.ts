import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { Profile } from 'next-auth';

interface GoogleProfile extends Profile {
  email_verified?: boolean;
  locale?: string;
  sub?: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: "openid email profile"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        const googleProfile = profile as GoogleProfile;
        console.log('\n🌟 ===============================');
        console.log('📧 Inicio de sesión con Google exitoso');
        console.log('===============================');
        console.log('👤 Datos del usuario:');
        console.log('   • Nombre:', user.name);
        console.log('   • Email:', user.email);
        console.log('   • Foto de perfil:', user.image);
        console.log('===============================\n');
      }
      return true;
    },
    async session({ session }) {
      return session;
    }
  },
  debug: false,
});

export { handler as GET, handler as POST };