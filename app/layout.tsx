"use client";
import './globals.css'
import React, {ReactNode, useEffect} from "react";
import {Header} from "@/components/header/header";
import {Inter} from "@next/font/google";
import Link from "next/link";
import {themeChange} from 'theme-change'

const inter = Inter({subsets: ['latin']});

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  useEffect(() => {
    themeChange(false);
  }, [])

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={'bg-base-200'}>
        <div className={'drawer'}>
          <input id={'menu-drawer'} type={'checkbox'} className={'drawer-toggle'} checked={drawerOpen} readOnly />
          <div className={'drawer-content'}>
            <Header onDrawerToggle={toggleDrawer} />
            {children}
          </div>
          <div className={'drawer-side'}>
            <label htmlFor="menu-drawer" className={'drawer-overlay'} onClick={toggleDrawer}></label>
            <ul className={'menu p-4 w-80 bg-base-100 text-base-content'}>
              <li>
                <Link href="/css-unit-converter">CSS Unit Converter</Link>
              </li>
              <li>
                <Link href="/base64-tool">Base64 Tool</Link>
              </li>
            </ul>
          </div>
        </div>
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
      </body>
    </html>
  )
}
