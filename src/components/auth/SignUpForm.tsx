import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

export const formSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(12, 'Password must be at least 12 characters').max(14, 'Password must be at most 14 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface SignUpFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  initialUsername?: string;
}

const SignUpForm = ({ onSubmit, initialUsername = '' }: SignUpFormProps) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: initialUsername,
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/welcome');
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-2 w-full max-w-md mx-auto mt-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-0.25 mt-[4px]">
              <FormControl>
                <Input 
                  {...field} 
                  className="bg-[#90b5cd] border-none text-[#2977b7] placeholder:text-[#f7f4e3] rounded-none h-14" 
                  placeholder="Type in username..." 
                  style={{
                    fontSize: field.value ? '13.5pt' : '11.5pt',
                  }}
                />
              </FormControl>
              <FormMessage className="text-[9.5pt]" />
              {initialUsername && (
                <p className="text-[#2977b7] text-[9.5pt] mt-[0.75px]">
                  Feel free to choose a different one.
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0.25 mt-[4px]">
              <FormControl>
                <Input 
                  {...field} 
                  type="email" 
                  className="bg-[#90b5cd] border-none text-[#2977b7] placeholder:text-[#f7f4e3] rounded-none h-14" 
                  placeholder="Enter your email..." 
                  style={{
                    fontSize: field.value ? '13.5pt' : '11.5pt',
                  }}
                />
              </FormControl>
              <FormMessage className="text-[9.5pt]" />
              <FormDescription className="text-[#2977b7] text-[9.5pt] mt-[0.75px]">
                We'll let you know if the item finds its way home.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-0.25 mt-[4px]">
              <FormControl>
                <Input 
                  {...field} 
                  type="password" 
                  className="bg-[#90b5cd] border-none text-[#2977b7] placeholder:text-[#f7f4e3] rounded-none h-14" 
                  placeholder="Create password..." 
                  style={{
                    fontSize: field.value ? '13.5pt' : '11.5pt',
                  }}
                />
              </FormControl>
              <FormMessage className="text-[9.5pt]" />
              <FormDescription className="text-[#2977b7] text-[9.5pt] mt-[0.75px]">
                Make it 12-14 characters and include a number.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-0.25 mt-[4px]">
              <FormControl>
                <Input 
                  {...field} 
                  type="password" 
                  className="bg-[#90b5cd] border-none text-[#2977b7] placeholder:text-[#f7f4e3] rounded-none h-14" 
                  placeholder="Re-type password..." 
                  style={{
                    fontSize: field.value ? '13.5pt' : '11.5pt',
                  }}
                />
              </FormControl>
              <FormMessage className="text-[9.5pt]" />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full rounded-none h-14 font-nunito text-xl font-normal" 
          style={{ backgroundColor: '#2977b7', marginTop: '20px' }}
        >
          Let's do it
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
