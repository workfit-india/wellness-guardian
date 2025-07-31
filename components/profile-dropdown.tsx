'use client'

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/app/dashboard/action';
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from 'react';
import { getInitials } from '@/lib/utils';

export interface UserProfile {
  avatar_url?: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  phone_verified: boolean;
  picture?: string;
  provider_id: string;
  sub: string;
}

export function ProfileDropdown() {

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const { user_metadata } = data.user;
        const userProfile: UserProfile = {
          avatar_url: user_metadata.avatar_url || user_metadata.picture || '',
          email: data.user.email || user_metadata.email || '',
          email_verified: user_metadata.email_verified || false,
          full_name: user_metadata.full_name || user_metadata.name || '',
          iss: user_metadata.iss || '',
          name: user_metadata.name || user_metadata.full_name || '',
          phone_verified: user_metadata.phone_verified || false,
          picture: user_metadata.picture || user_metadata.avatar_url || '',
          provider_id: user_metadata.provider_id || user_metadata.sub || '',
          sub: user_metadata.sub || ''
        };
        setUser(userProfile);
      }
      setLoading(false);
    };
    getUser();
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
          <Avatar className='h-10 w-10'>
            <AvatarImage 
              src={user ? (user.picture || user.avatar_url) : '../assets/workfit.png'} 
              alt={user ? (user.full_name || user.name) : 'User'}
            />
            <AvatarFallback>{user ? getInitials(user.full_name) : 'WF'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>{user ? user.full_name : ''}</p>
            <p className='text-muted-foreground text-xs leading-none'>
              {user ? user.email : "Sign In"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/settings'>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/settings'>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/settings'>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
