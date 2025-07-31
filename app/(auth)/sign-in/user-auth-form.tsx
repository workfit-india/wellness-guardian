"use client";

// import { IconBrandFacebook } from '@tabler/icons-react'
import Image from "next/image";
import { cn } from '@/lib/utils'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import { passwordMatchSchema } from '@/validation/passwordMatchSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { loginUser } from './action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-react";
import Link from 'next/link';
import GoogleSignin from './GoogleSignin';

// import { PasswordInput } from '@/components/passwordInput';
import { passwordSchema } from '@/validation/passwordSchema';


// type UserAuthFormProps = HTMLAttributes<HTMLFormElement>

const formSchema = z.object({
  email: z.string().email(),
  password: passwordSchema
})
//export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
export function UserAuthForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true); // Set loading to true when submission starts

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        // Redirect to the dashboard page
        router.push("/dashboard");
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false when submission ends
    }
  };

  // const email = form.getValues("email");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn('grid gap-3')}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                {/* <PasswordInput placeholder='********' {...field} /> */}
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
              <Link
                href='/forgot-password'
                className='text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75'
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />
        {serverError && (<p className="text-red-500 text-sm mt-2">{serverError}</p>)}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Login"
          )}
        </Button>

        <div className='relative my-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background text-muted-foreground px-2'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <GoogleSignin />
          <Button variant='outline' type='button' className="cursor-not-allowed" disabled>
            <Image
              src="https://authjs.dev/img/providers/facebook.svg"
              alt="FB logo"
              width={20}
              height={20}
              className="mr-2"
            /> Facebook
          </Button>
        </div>
      </form>
    </Form>
  )
}
