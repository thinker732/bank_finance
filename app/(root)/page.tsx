import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

/**
 * 
 * Manage session
 */
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const Home = async () => {

    const loggedIn=await getLoggedInUser();

   

    

 

  return (
    <section className='home'>
        <div className="home-content">
            <header className="home-header">
                <HeaderBox
                    type="greeting"
                    title="Welcome"
                    user={loggedIn?.name || 'Guest'}
                    subtext="Access and manage your account and transactions efficiently"
                />


                <TotalBalanceBox
                 accounts={[]}
                 totalBanks={1}
                 totalCurrentBalance={12563500000}
                 currency={loggedIn.currency?loggedIn.currency:'XAF'}
                />
            </header>

            RECENT TRANSACTIONS
        </div>

        <RightSideBar
            user={loggedIn} 
            transactions={[]}
            banks={[{currentBalance:1200000000},{currentBalance:4220000000}]}
         />

    </section>
  )
}

export default Home