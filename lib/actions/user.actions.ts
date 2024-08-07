'use server'

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";



export const signIn=async({email,password}:signInProps)=>{

    try{
      const { account } = await createAdminClient();

      const session = await account.createEmailPasswordSession(email, password);

      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: false,
});

       // const user=await getUserInfo({userId:session.userId})

      return parseStringify(session)
    }
    catch(error){
      console.error('Sign In Error ',error)
    }
}



export const signUp=async (userData:SignUpParams)=>{

    const {email,password,firstName,lastName}=userData;
     
    try {
        const { account } = await createAdminClient();

        const newUserAccount=await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );

        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: false,
        });
            
        return parseStringify(newUserAccount)
    } catch (error) {
            console.error('Error',error)
    }
}


// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user= await account.get();
      return parseStringify(user)
    } catch (error) {
      return null;
    }
  }


  export const logoutAccount=async ()=>{
    try{
        const {account}=await createSessionClient();
        cookies().delete('appwrite-session')

        await account.deleteSession('current')
    }
    catch(e){
      return null
    }
  }
  