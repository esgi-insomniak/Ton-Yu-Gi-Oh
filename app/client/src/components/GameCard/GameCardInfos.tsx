
import { IGameCard } from '@/helpers/types/cards';

const GameCardInfos = (props: IGameCard) => {
  return (
    <div className='absolute top-1/2 inset-y-0 left-[125%] transform -translate-y-1/2 bg-[#2a303c] bg-opacity-90 h-fit w-[200%] p-3 space-y-2 text-white rounded-md text-xs border-2'>
      <p className='text-base'>{props.card.name}</p>
      <p>ref : {props.card.identifiant}</p>
      <p>rareté : {props.rarity.name}</p>
      <p>booster : {props.set.name}</p>
      <p>description : {props.card.description}</p>
    </ div>
  )
}

export default GameCardInfos;
