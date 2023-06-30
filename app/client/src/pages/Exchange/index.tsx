import { useGetCardById } from '@/helpers/api/hooks/cards/card-set.hook'
import { useGetUserWithCardSetId, useMe } from '@/helpers/api/hooks/users'
import { userSchemaType } from '@/helpers/utils/schema/Admin'
import React from 'react'
import { BsDot } from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Exchange = () => {

    const { cardId } = useParams<{ cardId: string }>()
    const { data: cardSetResponse, isLoading } = useGetCardById(cardId!)
    const { users: usersResponse } = useGetUserWithCardSetId(cardId!, 25, 0)
    const { me } = useMe()
    const router = useNavigate()

    React.useEffect(() => {
        if (isLoading) return
        if (cardSetResponse?.data.id !== cardId) router('/')
    }, [cardSetResponse, cardId])

    return (
        <div className='w-full h-full px-20 py-10'>
            <div className="text-sm breadcrumbs mb-10">
                <ul>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/collection'}>Collection</Link></li>
                    <li>{cardSetResponse?.data.card.name}</li>
                </ul>
            </div>
            <div className="w-full flex justify-center">
                <h1 className="mb-5 text-5xl font-bold">
                    Echange de <span className="text-yellow-500">{cardSetResponse?.data.card.name}</span>
                </h1>
            </div>
            <div className='flex flex-wrap gap-5'>
                {
                    usersResponse.data && usersResponse?.data?.data?.filter((user: userSchemaType) => user.id !== me?.id)?.length > 0 ? (
                        usersResponse?.data?.data
                            ?.filter((user: userSchemaType) => user.id !== me?.id)
                            ?.map((user: userSchemaType) => (
                                <div className='rounded-md bg-white flex-grow basis-80 max-w-sm h-fit p-3 drop-shadow-lg relative flex justify-between items-center'>
                                    <div className='flex items-center'>
                                        <p>{user.username}</p>
                                        <BsDot className={`${user.isOnline ? 'text-green-500' : 'text-red-500'} h-10 w-10`} />
                                    </div>
                                    <button className='btn'>Faire une offre</button>
                                </div>
                            )
                            )) : (
                        <div className='mx-auto'>
                            <p>Aucun utilisateur n'a cette carte</p>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Exchange