'use client'

import { usePathname, useRouter } from 'next/navigation'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Bell, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { createBrowserClient } from '@supabase/ssr'

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/content': 'Blogs & Podcasts',
  '/admin/courses': 'Courses',
  '/admin/events': 'Events',
  '/admin/contact': 'Contact Submissions',
  '/admin/assessments': 'Assessment Submissions',
  '/admin/newsletter': 'Newsletter Signups',
}

export function AdminHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const title = pageTitles[pathname] ?? 'Admin'

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <span className="font-medium text-sm">{title}</span>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 relative">
          <Bell className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-xs">G</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">Grant</p>
              <p className="text-xs text-muted-foreground">grant@bbtx.ai</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
