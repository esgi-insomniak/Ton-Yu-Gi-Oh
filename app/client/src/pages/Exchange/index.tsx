import { useSocket } from '@/helpers/api/hooks'
import { useGetCardById } from '@/helpers/api/hooks/cards/card-set.hook'
import { useGetUserWithCardSetId, useMe } from '@/helpers/api/hooks/users'
import { useAlert } from '@/helpers/providers/alerts/AlertProvider'
import { ISocketEvent, ISocketEventType } from '@/helpers/types/socket'
import { userSchemaType } from '@/helpers/utils/schema/Admin'
import React from 'react'
import { BsDot } from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Exchange = () => {

    const { cardId } = useParams<{ cardId: string }>()
    const { data: cardSetResponse, isLoading } = useGetCardById(cardId!)
    const { users: usersResponse } = useGetUserWithCardSetId(cardId!, 25, 0)
    const [users, setUsers] = React.useState<userSchemaType[] | null>(null)
    const { me } = useMe()
    const { ioClient } = useSocket()
    const alert = useAlert()
    const router = useNavigate()

    const makeOffer = (userId: string) => {
        ioClient?.emit('exchange__create', {
            userId,
            cardSetId: cardId,
        })
    }

    React.useEffect(() => {
        ioClient?.off('exchange__created')
        ioClient?.on('exchange__created', (event: ISocketEvent) => {
            if (event.type === ISocketEventType.INFO) {
                ioClient?.off('exchange__created')
                return router(`/exchange-room/${event.data.id}`)
            }
            alert?.error(event.data.message)
        })
    }, [])

    React.useEffect(() => {
        ioClient?.off('user__is_online')
        if (!users) return;
        ioClient?.on('user__is_online', (event: ISocketEvent) => {
            setUsers(
                users.map((user: userSchemaType) => {
                    if (user.id === event.data.userId) {
                        return {
                            ...user,
                            isOnline: event.data.isOnline
                        }
                    }
                    return user
                })
            );
        })
    }, [users])

    React.useEffect(() => {
        if (!usersResponse?.data?.data) return;
        setUsers(usersResponse?.data?.data);
    }, [usersResponse])

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
                    users && users?.filter((user: userSchemaType) => user.id !== me?.id)?.length > 0 ? (
                        users
                            ?.filter((user: userSchemaType) => user.id !== me?.id)
                            ?.map((user: userSchemaType) => (
                                <div className='rounded-md bg-white flex-grow basis-80 max-w-sm h-fit p-3 drop-shadow-lg relative flex justify-between items-center'>
                                    <div className='flex items-center'>
                                        <p>{user.username}</p>
                                        <BsDot className={`${user.isOnline ? 'text-green-500' : 'text-red-500'} h-10 w-10`} />
                                    </div>
                                    <button className='btn' onClick={() => makeOffer(user.id)}>Faire une offre</button>
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