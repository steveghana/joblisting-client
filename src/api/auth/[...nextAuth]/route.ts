// import { signJwt } from "@/lib/jwt";
// import { SupabaseAdapter } from '@auth/supabase-adapter';
// import { Adapter } from 'next-auth/adapters';
import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import { signJwt } from 'src/lib/jwt';
type UserWithRole = {
  role: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

const handler = NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   authorization: {
    //     params: {
    //       prompt: 'consent',
    //       access_type: 'offline',
    //       response_type: 'code'
    //     }
    //   }
    // })
  ],
  session: {
    strategy: 'jwt',
  },
  // adapter: SupabaseAdapter({
  //   url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   secret: process.env.SUPABASE_SERVICE_ROLE_KEY
  // }) as Adapter,
  callbacks: {
    async jwt({ token, account }) {
      const local_authtoken = sessionStorage.getItem('auth_token');
      if (local_authtoken) {
        token.auth_token = local_authtoken;
      }
      if (account) {
        // token.auth_token = await signJwt({
        //   sub: token.sub,
        //   id_token: account.id_token,
        //   access_token: account.access_token,
        //   expires_at: account.expires_at
        // });
      }
      return token;
    },
    async session({ session, token }) {
      const role = sessionStorage.getItem('role');
      // session.auth_token = token.auth_token as string;
      session.user = { ...session.user, role } as UserWithRole;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
