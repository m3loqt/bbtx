'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar'
import { Toaster } from 'sonner'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // On the login route and the full-page blog editor, skip the sidebar chrome —
  // the editor wants a focused, edge-to-edge writing canvas like Substack's.
  const isChromeless =
    pathname === '/admin/login' ||
    pathname === '/admin/login/' ||
    pathname.startsWith('/admin/content/blog/')

  if (isChromeless) {
    return (
      <>
        {children}
        <Toaster richColors position="top-right" />
      </>
    )
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </SidebarInset>
      <Toaster richColors position="top-right" />
    </SidebarProvider>
  )
}
