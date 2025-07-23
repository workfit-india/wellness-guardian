'use client'

import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarRail,
  // useSidebar,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
// import { NavUser } from '@/components/layout/nav-user'
import { TeamSwitcher } from '@/components/layout/team-switcher'
import { sidebarData } from './data/sidebar-data'

import { ComponentType } from 'react';

export interface SidebarData {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  teams: Team[];
  navGroups: NavGroup[];
}

export interface Team {
  name: string;
  logo: ComponentType; // assuming these are imported React icon components
  plan: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  url?: string;
  icon?: ComponentType; // icon components
  badge?: string;
  items?: NavItem[]; // nested menu items
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const { state, toggleSidebar } = useSidebar()
  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {
          sidebarData.navGroups.map((props) => (
            <NavGroup key={props.title} {...props} />
          ))
        }
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  )
}
