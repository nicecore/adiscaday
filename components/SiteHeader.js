import React from "react";
import Link from 'next/link';

/* 
Site header or layout component that wraps root app component
and contains the navbar.
*/

export default function SiteHeader({children}) {
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <Link id="site-title-link" href="/">a disc a day</Link>
          </div>
          <ul className="nav">
            <Link className="nav-links" href="/about">about</Link>
          </ul>
        </div>
      </nav>
      {children}
    </div>
  );
}