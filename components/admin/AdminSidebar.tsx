'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  Calendar,
  Mail,
  ClipboardList,
  Bell,
  LogOut,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const navItems = [
  {
    group: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    group: 'Content',
    items: [
      { label: 'Blogs & Podcasts', href: '/admin/content', icon: FileText },
      { label: 'Courses', href: '/admin/courses', icon: GraduationCap },
      { label: 'Events', href: '/admin/events', icon: Calendar },
    ],
  },
  {
    group: 'Submissions',
    items: [
      { label: 'Contact', href: '/admin/contact', icon: Mail },
      { label: 'Assessments', href: '/admin/assessments', icon: ClipboardList },
      { label: 'Newsletter', href: '/admin/newsletter', icon: Bell },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-tight">BBTX</span>
          <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
            Admin
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navItems.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={isActive(item.href, 'exact' in item ? item.exact : undefined)}
                    onClick={() => router.push(item.href)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">G</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Grant</p>
            <p className="text-xs text-muted-foreground truncate">grant@bbtx.ai</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            title="Sign Out"
            className="h-8 w-8 shrink-0"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
