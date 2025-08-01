"use client";

import { useState } from 'react'
import Image from "next/image";
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// import { PasswordInput } from '@/components/password-input'
import { PasswordInput } from '@/components/passwordInput';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useRouter } from "next/navigation";
import { CheckCircle } from 'lucide-react'; 
import { registerUser } from '../action';
import GoogleSignin from '../../sign-in/GoogleSignin';

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Please enter your email' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(1, {
        message: 'Please enter your password',
      })
      .min(7, {
        message: 'Password must be at least 7 characters long',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })

// export function SignUpForm({ className, ...props }: SignUpFormProps) {
export function SignUpForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setServerError(null);
    setIsLoading(true); // Set loading to true when submission starts

    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        passwordConfirm: data.confirmPassword,
      });

      if (response.error) {
        setServerError(response.message);
      } else {
        setShowSuccess(true);
        setTimeout(() => {
          router.push('/sign-in');
        }, 5000);
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false when submission ends
    }
  };

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
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {serverError && (
          <p className="text-red-500 text-sm mt-2">{serverError}</p>
        )}
        <Button className='mt-2' disabled={isLoading}>
          Create Account
        </Button>

        {showSuccess && (
          <Alert variant="default" className="mb-4 border-green-500 bg-green-50">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-700">Registration Successful!</AlertTitle>
            <AlertDescription className="text-green-600">
              You&apos;re almost there! We&apos;ve sent a confirmation email to your address. Click the link inside to activate your account.
            </AlertDescription>
          </Alert>
        )}

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
