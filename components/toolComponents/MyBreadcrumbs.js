import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const MyBreadcrumbs = ({
  link1Title,
  link1Href,
  link2Title,
  link2Href,
  activePageNumber,
}) => {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {link1Title != "" && (
          <Link
            underline="hover"
            color="inherit"
            href={link1Href}
            aria-current={activePageNumber == "1" ? "page" : ""}
          >
            {link1Title}
          </Link>
        )}
        {link2Title != "" && (
          <Link
            underline="hover"
            color="inherit"
            href={link2Href}
            aria-current={activePageNumber == "2" ? "page" : ""}
          >
            {link2Title}
          </Link>
        )}
      </Breadcrumbs>
    </div>
  );
};

export default MyBreadcrumbs;
