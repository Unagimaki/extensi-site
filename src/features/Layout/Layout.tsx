import React, { ReactNode } from 'react'
import { Header, Footer } from 'features'
import s from './layout.module.scss'

interface LayoutProps {
  children: ReactNode
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={s.layout}>
      <Header />
      <div className={s.content}>{children}</div>
      <Footer/>
    </div>
  )
}
