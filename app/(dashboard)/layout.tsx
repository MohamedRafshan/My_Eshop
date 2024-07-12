// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "../globals.css";
// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton
// } from '@clerk/nextjs'
// import LeftSideBar from "@/components/layout/LeftSideBar";
// import TopBar from "@/components/layout/TopBar";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Rafshan - Store Dashboard",
//   description: "Rafshan Dashboard Ecommerce store",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <html lang="en" >

//         {/* <SignedOut>
//           <SignInButton />
//         </SignedOut>
//         <SignedIn>
//           <UserButton />
//         </SignedIn> */}
//         <body className={inter.className}>
//           <div className="flex max-lg:flex-col text-grey-1">
//           <LeftSideBar />
//           <TopBar />
//           </div>
//           {children}
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
// import { ToasterProvider } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borcelle - Admin Dashboard",
  description: "Admin dashboard to manage Borcelle's data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* <ToasterProvider /> */}
          <div className="flex max-lg:flex-col text-grey-1">
            <LeftSideBar />
            <TopBar />
            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
