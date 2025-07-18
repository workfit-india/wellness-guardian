'use client'

// import { Outlet } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
// import Cookies from 'js-cookie'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'

interface Props {
  children?: React.ReactNode
}

export function AuthenticatedLayout({ children }: Props) {
  // const defaultOpen = Cookies.get('sidebar_state') !== 'false'

  const [defaultOpen, setDefaultOpen] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Restore sidebar state from cookies
    const savedState = true; // Cookies.get('sidebar_state')
    // setDefaultOpen(savedState !== false)
    setDefaultOpen(savedState)

  }, [])

  // Prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }
  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'sm:transition-[width] sm:duration-200 sm:ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
          )}
        >
          {children}
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
