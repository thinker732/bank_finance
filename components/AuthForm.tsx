'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'



import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorOption, Field, FieldArray, FieldArrayPath, FieldError, FieldErrors, FieldValues, FormState, RegisterOptions, SubmitErrorHandler, SubmitHandler, UseFormRegisterReturn, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import {authFormSchema} from '@/lib/utils'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import SignUp from '@/app/(auth)/sign-up/page'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'



const AuthForm = ({type}:{type:string}) => {
  const router = useRouter()
  const [user, setuser] = useState(null)
  const [isloading, setIsloading] = useState(false)

  

  const formSchema=authFormSchema(type)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
    },
    mode:"onChange"
  })
 
  // 2. Define a submit handler.
  const onSubmit=async (data: z.infer<typeof formSchema>)=>{
    console.log("test")
    setIsloading(true)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(data)

      try {
        //sign up with Ap Write and create a plain link token

        if(type='sign-up'){
            const newUser=await signUp(data)

            setuser(newUser)
        }

        if(type='sign-in'){

          
            const response=await signIn({
               email:data.email,
               password:data.password,
             })

              if(response) router.push('/')
        }

      } catch (error) {
        console.log(error)
      }
      finally{
        setIsloading(false)
      }

    
  }


  return (
    <section className="auth-form">
      <header className='flex flex-col gap-5 md:gap-8'>
       <Link href='/' className="flex cursor-pointer items-center gap-1">
                    <Image src="/icons/logo.svg" 
                            width={34} 
                            height={34} 
                            alt="Horizon logo"
                    />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
             </Link>


             <div className="flex flex-col gap-1 md:gap-3">
                 <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user?
                      'Link Account':
                      type=='sign-in'?
                      'Sign In'
                      :'Sign Up'  
                  }

                  <p className="text-16 font-normal text-gray-600">
                    {user?
                        'Link your account to get started'
                        :'Please enter your details'
                    }
                  </p>
                  </h1>  
             </div>
      </header>


      {user?
      (
        <div className="flex flex-col gap-4">
           {/*  PlaidLink */}
        </div>
      )
       :
      (
        
        <><Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {
              type==='sign-up' && (

                <>

                <div className='flex gap-4'>
                 <CustomInput control={form.control}  fieldName="firstName" label="First Name" placeholder="enter your first Name"/>
                 <CustomInput control={form.control}  fieldName="lastName" label="Last Name" placeholder="enter your first Name"/>
                </div>
                 <CustomInput control={form.control}  fieldName="address1" label="Address" placeholder="enter your specific address"/>
                 <CustomInput control={form.control}  fieldName="city" label="City" placeholder="please enter your city"/>

                 <div className='flex gap-4'>
                  <CustomInput control={form.control}  fieldName="state" label="State" placeholder="ex: NY"/>
                  <CustomInput control={form.control}  fieldName="postalCode" label="Postal Code" placeholder="example: 11101"/> 
                 </div>

                 <div className='flex gap-4'>
                  <CustomInput control={form.control}  fieldName="DateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" />
                   <CustomInput control={form.control}  fieldName="SSN" label="SSN" placeholder="ex: 123" />
                 </div>
                </>

              )
            }


             <CustomInput control={form.control}  fieldName="email" label="Email" placeholder="enter your Email"/>
             <CustomInput control={form.control}  fieldName="password" label="Password" placeholder="enter your password"/>
            {
              type=='sign-up' && (
                <CustomInput control={form.control}  fieldName="password1" label="Confirm Password" placeholder="enter your password again"/>
              )
            }
          
          <div className="flex flex-col gap-4">
          <Button type="submit" className='form-btn' disabled={isloading}>{
            isloading?(
              <>
                <Loader2 size={20} className="animate-spin"/> &nbsp;
                Loading..
              </>
            ):
            type==='sign-in'?'Sign In':'Sign Up'
          }</Button>
          </div>
          
        </form>
      </Form>

      <footer className="flex justify-center ga-1">
          <p className='text-15 font-normal text-gray-600'>
             {type==='sign-in'?
              "Don't have an account?  ":
              "Already have an account?  " 
            }
          </p>
          <Link href={type==='sign-in'?'/sign-up':'/sign-in'} className='form-link'>
            &nbsp; {type==='sign-in'?' sign-up':' sign-in'}
          </Link>
      </footer>

      </>
      )
      }
    </section>  
  )
}

export default AuthForm