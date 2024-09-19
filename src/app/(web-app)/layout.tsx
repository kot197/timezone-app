"use client"
import { Inter } from "next/font/google";
import "../globals.css";
import { HomeIcon, UsersIcon, UserPlusIcon, GlobeAltIcon, BellIcon, Cog6ToothIcon, QuestionMarkCircleIcon, PowerIcon } from "@heroicons/react/24/solid";
import SideBar, { EllipsisMenuItem, SideBarItem } from "../ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  const pathname = usePathname();
  console.log(pathname);
  
  return (
    <html lang="en">
      <body className={inter.className + ' flex'}>
        <SideBar profileMenu={
          <EllipsisMenuItem icon={<PowerIcon className="size-6 inline mr-2"></PowerIcon>}>
          </EllipsisMenuItem>
        }>
            <SideBarItem
                href="home"
                path={pathname}
                icon={<HomeIcon className="size-6"/>}
                text="Home"
                alert/>
            <SideBarItem
                href="friend-list"
                path={pathname}
                icon={<UsersIcon className="size-6"/>}
                text="Friend List"/>
            <SideBarItem
              href="add-friend"
                path={pathname}
                icon={<UserPlusIcon className="size-6"/>}
                text="Add Friend"/>
          <SideBarItem
              href="timezone-map"
              path={pathname}
              icon={<GlobeAltIcon className="size-6"/>}
              text="Time Zone Map"
              alert/>
          <SideBarItem
              path={pathname}
              href="notifications"
              icon={<BellIcon className="size-6"/>}
              text="Notifications"/>
          <hr className="my-3"/>
          <SideBarItem
              href="settings"
              path={pathname}
              icon={<Cog6ToothIcon className="size-6"/>}
              text="Settings"/>
          <SideBarItem
              href="help"
              path={pathname}
              icon={<QuestionMarkCircleIcon className="size-6"/>}
              text="Help"/>
        </SideBar>
        {children}
      </body>
    </html>
  );
}
