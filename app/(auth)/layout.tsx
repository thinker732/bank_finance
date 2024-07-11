import {
  getLoggedInUser
} from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Image from "next/image"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getLoggedInUser();

  console.log(user);
      if (user) redirect("/");

  return (
   <main className="flex min-h-screen w-full justify-between font-inter">
    {children}

    <div className="auth-asset">
      <div>
        <Image src="/icons/auth-image.svg" alt="Auth image" width={500} height={500}></Image>
      </div>
    </div>
    </main>
  );
}