/* eslint-disable */
// @ts-nocheck
// Generated TanStack Router route tree. Recreated for the committed file routes.
import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AdminRouteImport } from './routes/admin'
import { Route as FormTokenRouteImport } from './routes/ficha.$token'

const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const AdminRoute = AdminRouteImport.update({ id: '/admin', path: '/admin', getParentRoute: () => rootRouteImport } as any)
const FormTokenRoute = FormTokenRouteImport.update({ id: '/ficha/$token', path: '/ficha/$token', getParentRoute: () => rootRouteImport } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/admin': typeof AdminRoute
  '/ficha/$token': typeof FormTokenRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/admin': typeof AdminRoute
  '/ficha/$token': typeof FormTokenRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/admin': typeof AdminRoute
  '/ficha/$token': typeof FormTokenRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/admin' | '/ficha/$token'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/admin' | '/ficha/$token'
  id: '__root__' | '/' | '/admin' | '/ficha/$token'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AdminRoute: typeof AdminRoute
  FormTokenRoute: typeof FormTokenRoute
}
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/admin': { id: '/admin'; path: '/admin'; fullPath: '/admin'; preLoaderRoute: typeof AdminRouteImport; parentRoute: typeof rootRouteImport }
    '/ficha/$token': { id: '/ficha/$token'; path: '/ficha/$token'; fullPath: '/ficha/$token'; preLoaderRoute: typeof FormTokenRouteImport; parentRoute: typeof rootRouteImport }
  }
}
const rootRouteChildren: RootRouteChildren = { IndexRoute, AdminRoute, FormTokenRoute }
export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()
import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
    config: Awaited<ReturnType<typeof startInstance.getOptions>>
  }
}
