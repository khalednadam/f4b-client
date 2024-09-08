import { Home, TrendingUp, Search, Bookmark, User } from "lucide-react";
import React from "react";
import NavBarItem from "./NavBarItem";

interface SideNavBarMenuItemsProps {
  isMini?: boolean;
}

const SideNavBarMenuItems = ({ isMini = false }: SideNavBarMenuItemsProps) => {
  return (
    <>
      <NavBarItem Icon={<Home />} Text="Home" isMini={isMini} />
      <NavBarItem Icon={<TrendingUp />} Text="Trending" isMini={isMini} />
      <NavBarItem Icon={<Search />} Text="Search" isMini={isMini} />
      <NavBarItem Icon={<Bookmark />} Text="Saved" isMini={isMini} />
      <NavBarItem Icon={<User />} Text="Profile" isMini={isMini} />
    </>
  );
};

export default SideNavBarMenuItems;
