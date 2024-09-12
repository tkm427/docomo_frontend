import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#ff0033" }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box sx={{ flexGrow: 0 }}>
          <Link href="/" passHref>
            <Image
              src="/logo_flat.svg"
              alt="ディス活 Logo"
              width={190}
              height={100}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
