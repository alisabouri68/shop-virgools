import React from "react";
import Container from "./Container";
import RighHeader from "./RighHeader";
import LeftHeader from "./LeftHeader";
import BtnToggleTheme from "./btnToggleTheme";
import ShopingCart from "./ShopingCart";
import SearchBox from "./SearchBox";
import ModalParent from "../modal/ModalParent";
function Header() {
  return (
    <header className="h-84px mb-5 ">
      <Container>
        <div className="w-full h-full flex shadow-sm shadow-gray-200 dark:shadow-gray-900 relative z-10 bg-[var(--background)]">
          <RighHeader>
            <ShopingCart />
            <BtnToggleTheme />
            <SearchBox/>
            
          </RighHeader>
          <LeftHeader>
          </LeftHeader>
        </div>
      </Container>
    </header>
  );
}

export default Header;
