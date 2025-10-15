import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/script/prismaclient";

// 本来はセキュリティのためにシークレットなどはソースコードに直接記述しないが今回は勉強用サイトとして動作しやすさを優先するためにソースコードに直接記述する
export const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: 'Iv23li6omrzhJETTKUxQ',
      clientSecret: '664313a6d6cb9c8f146c0fa8ebf7291713bc9476',
    }),
  ],
  secret: 'Qdl03y8W7kA6dGD1b4xATFwvXQDHk7DN2pdCsBuzFwU=',
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      // ユーザーがDBにいなければ追加
      const exist = await prisma.user.findUnique({ where: { email: user.email! } });
      if (!exist) {
        await prisma.user.create({
          data: {
            name: user.name ?? "",
            email: user.email!,
            password: "",
          },
        });
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
