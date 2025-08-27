import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { handler } from "../api/auth/[...nextauth]/route";
import { Session } from "next-auth";
import ClientProfile from "@/components/clientprofile";

export default async function ProfilePage() {
  const session : Session | null = await getServerSession(handler);

  if (!session) {
    redirect("/");
  }

  return <ClientProfile session={session} />;
}
