
import { IGameCard } from '@/helpers/types/cards';

const GameCardInfos = (props: IGameCard) => {
  return (
    <div className='absolute top-1/2 inset-y-0 left-[125%] transform -translate-y-1/2 bg-[#2a303c] bg-opacity-90 h-fit w-[200%] p-3 space-y-2 text-white rounded-md text-xs border-2 pointer-events-auto' >
      <p className='text-base'>{props.card.name}</p>
      <p>ref : {props.card.identifiant}</p>
      <p>rareté : {props.rarity.name}</p>
      <p>booster : {props.set.name}</p>
      <p>type : {props.card.type.name}</p>
      {
        props.card.archetype && (
          <p>archetype : {props.card.archetype.name}</p>
        )
      }
      {
        props.card.attribute && (
          <p>attribut : {props.card.attribute.name}</p>
        )
      }
      {
        (props.card.level !== null || props.card.atk !== null || props.card.def !== null) && (
          <div className='grid grid-flow-col grid-cols-3'>
            {props.card.level !== null && (
              <p>niveau : {props.card.level}</p>
            )}
            {props.card.atk !== null && (
              <p>attaque : {props.card.atk}</p>
            )}
            {props.card.def !== null && (
              <p>défence : {props.card.def}</p>
            )}
          </div>
        )
      }
      <p>description : {props.card.description}</p>
      <div className="flex justify-center align-center">
        <button className='btn'>Trouver un échange</button>
      </div>
    </div >
  )
}

export default GameCardInfos;
