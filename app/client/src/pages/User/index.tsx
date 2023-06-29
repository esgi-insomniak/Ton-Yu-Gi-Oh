import { useAuth } from '@/helpers/api/hooks'
import { useMe } from '@/helpers/api/hooks/users'
import React from 'react'

const UserProfil = () => {
    const { user } = useAuth()
    const { data } = useMe(user.id)

    return (
        <div className='w-full h-full p-10 scrollbar-none overflow-scroll flex flex-col'>
            <div className='relative h-52 w-full bg-white rounded-lg drop-shadow-xl' style={{ background: 'linear-gradient(310deg, rgba(33, 82, 255, 0.6), rgba(33, 212, 253, 0.6)) 50% center / cover, url("/user-bg.jpg") transparent no-repeat', backgroundSize: 'cover' }}>
                {/* User */}
                <div className='absolute -bottom-14 h-28 w-1/4 left-4 right-4 rounded-b-lg drop-shadow-2xl shadow-xl mx-auto rounded-lg p-3 flex items-center backdrop-filter backdrop-blur-2xl bg-opacity-90 bg-gray-100/50'>
                    <div className='flex items-start gap-5'>
                        <img src="/logo_app.png" alt="" className='w-20 h-20 drop-shadow-xl rounded-lg' />
                        <span className='text-xl font-semibold text-gray-700'>{data?.data.username}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-5 mt-28">
                {/* Mes infos */}
                <div className='flex flex-grow basis-1/4 bg-white h-fit p-5 items-start rounded-lg flex-col'>
                    <b>Mes informations :</b>
                    <span>Role : {data?.data.roles.join(' ').toUpperCase()}</span>
                    <span>Email: {data?.data.email}</span>
                </div>

                {/* Transaction */}
                <div className='flex flex-grow basis-1/4 bg-white h-2/3 p-5 items-center rounded-lg'>
                    <span>Mes transactions :</span>
                </div>

                {/* Echanges */}
                <div className='flex flex-grow basis-1/4 bg-white h-2/3 p-5 items-center rounded-lg'>
                    <span>Mes échanges :</span>
                </div>
            </div>
        </div>
    )
}

export default UserProfil