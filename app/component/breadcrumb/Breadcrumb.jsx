"use client";
import React, { useEffect, useState } from "react";
import Container from "../header/Container";
import { usePathname } from "next/navigation";
import { dbmegamenu } from "../header/db";
function Breadcrumb() {
  const pathname = usePathname();
  const [breadCrumb, setBreadCrumb] = useState([]);

  useEffect(() => {
    setBreadCrumb(pathname.split("/").filter(Boolean));
  }, [pathname]);

  const getBreadcrumbName = (item) => {
    if (item === "category") return "دسته بندی";
    for (let i = 0; i < dbmegamenu.length; i++) {
      if (dbmegamenu[i].menu[1] === item) {
        return dbmegamenu[i].menu[0];
      }
      const match = dbmegamenu[i].submenu.find((a) => a[1] === item);
      if (match) {
        return match[0];
      }
    }
    return item;
  };
  return (
    <div className="h-12  mt-5 ">
      <Container>
        <div className="w-full h-full overflow-hidden  flex items-center justify-center  bg-amber-500 breadcrumb-parent">
          <div className=" lg:hidden flex  items-center justify-center text-xs">
            خانه _
          </div>
          <div className="breadcrumb-home hidden lg:flex  items-center justify-center">
            خانه
          </div>
          {breadCrumb.length > 0
            ? breadCrumb.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  className="flex lg:hidden items-center justify-center lg:px-20 px-1 text-xs "
                >
                  {getBreadcrumbName(item)} _
                </div>
                <div
                  className="breadcrumb-one hidden lg:flex items-center justify-center px-20"
                >
                  {getBreadcrumbName(item)}
                  
                </div>
 

              </React.Fragment>
            ))
            : ""}
        </div>
      </Container>
    </div>
  );
}

export default Breadcrumb;
