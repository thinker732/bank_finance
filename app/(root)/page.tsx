import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {

    const loggedIn={firstName:'Daniel',lastName:'BAED',email:'baed@baed.Com',currency:'XAF'}
  return (
    <section className='home'>
        <div className="home-content">
            <header className="home-header">
                <HeaderBox
                    type="greeting"
                    title="Welcome"
                    user={loggedIn?.firstName || 'Guest'}
                    subtext="Access and manage your account and transactions efficiently"
                />


                <TotalBalanceBox
                 accounts={[]}
                 totalBanks={1}
                 totalCurrentBalance={125635}
                 currency={loggedIn?.currency}
                />
            </header>

            RECENT TRANSACTIONS
        </div>

        <RightSideBar
            user={loggedIn}
            transactions={[]}
            banks={[{currentBalance:1200000},{currentBalance:42200000}]}
         />

    </section>
  )
}

export default Home