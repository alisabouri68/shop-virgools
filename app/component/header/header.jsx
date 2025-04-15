import React from "react";
import Container from "./Container";
import RighHeader from "./RighHeader";
import LeftHeader from "./LeftHeader";
import BtnToggleTheme from "./btnToggleTheme";
import ShopingCart from "./ShopingCart";
import SearchBox from "./SearchBox";
import Menu from "./menu/Menu";
function Header() {
  return (
    <header className=" mb-5 sticky z-50 top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-[bg-[var(--background)]]/60">
      <Container>
        <div className="h-full flex items-center justify-between border-b px-4">
          <RighHeader>
            <Menu />
            <ShopingCart />
            <BtnToggleTheme />
            <SearchBox />

          </RighHeader>
          <LeftHeader />
        </div>
      </Container>
    </header>
  );
}

export default Header;