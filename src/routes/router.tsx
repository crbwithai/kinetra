import type { ComponentType } from 'react'
import { createBrowserRouter, Navigate } from 'react-router'
import type { Lang, PageKey } from '../i18n/pages'
import { LANGS, PAGES } from '../i18n/pages'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import GlobalNotFound from './GlobalNotFound'
import LangLayout from './LangLayout'

const PAGE_COMPONENTS: Record<PageKey, ComponentType> = {
  home: Home,
}

function langRouteChildren(lang: Lang) {
  const pageRoutes = (Object.keys(PAGES) as PageKey[]).map((key) => {
    const slug = PAGES[key].slugs[lang]
    const Component = PAGE_COMPONENTS[key]
    return slug ? { path: slug, element: <Component /> } : { index: true, element: <Component /> }
  })
  return [...pageRoutes, { path: '*', element: <NotFound /> }]
}

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/tr" replace /> },
  ...LANGS.map((lang) => ({
    path: lang,
    element: <LangLayout lang={lang} />,
    children: langRouteChildren(lang),
  })),
  { path: '*', element: <GlobalNotFound /> },
])
