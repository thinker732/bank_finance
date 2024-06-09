import React from 'react'
import { FormControl, FormField, FormLabel ,FormMessage} from './ui/form'
import { Input } from './ui/input'
import {Control,FieldPath} from 'react-hook-form'
import {authFormSchema} from '@/lib/utils'
import { z } from 'zod'


const formSchema=authFormSchema('input')
interface CustomInputprops{
   control:Control<z.infer<typeof formSchema>>
    fieldName:FieldPath<z.infer<typeof formSchema>>,
    label:string,
    placeholder:string|undefined,}

const CustomInput = ({control,fieldName,label,placeholder,}:
    CustomInputprops) => {
  return (
    <FormField
                    control={control}
                        name={fieldName}
                        render={({ field }) => (
                          <div className='form-item'>
                            <FormLabel className='form-label'>{label}</FormLabel>
                            <div className='flex w-full flex-col'>
                                <FormControl>
                                    <Input 
                                    placeholder={placeholder}
                                    type={fieldName==='password'?'password':'text'}
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage className="form-message mt-2"/>
                            </div>
                          </div>
                        )}
           />
  )
}

export default CustomInput