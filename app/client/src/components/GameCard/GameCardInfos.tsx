
import { IGameCard } from '@/helpers/types/cards';
import { useNavigate } from 'react-router-dom';

const GameCardInfos = (props: IGameCard) => {

  const navigate = useNavigate();

  return (
    <div className='absolute top-1/2 inset-y-0 left-[125%] transform -translate-y-1/2 bg-[#2a303c] bg-opacity-90 h-fit lg:w-[450px] md:w-[350px] sm:w-[200px] p-3 space-y-2 text-white rounded-md text-xs border-2 pointer-events-auto'>
      <p className='text-base'>{props.card.name}</p>
      <div className='flex justify-around'>
        <p>Ref : <br /> {props.card.identifiant}</p>
        <p>Rareté : <br /> {props.rarity.name}</p>
        <p>Booster :  <br />{props.set.name}</p>
        <p>Type : <br /> {props.card.type.name}</p>
      </div>
      <div>
        {
          props.card.archetype && (
            <p>Archetype : {props.card.archetype.name}</p>
          )
        }
        {
          props.card.attribute && (
            <p>Attribut : {props.card.attribute.name}</p>
          )
        }
        {
          (props.card.level !== null || props.card.atk !== null || props.card.def !== null) && (
            <div className='grid grid-flow-col grid-cols-3'>
              {props.card.level !== null && (
                <p>Niveau : {props.card.level}</p>
              )}
              {props.card.atk !== null && (
                <p>Attaque : {props.card.atk}</p>
              )}
              {props.card.def !== null && (
                <p>Defence : {props.card.def}</p>
              )}
            </div>
          )
        }
      </div>
      <p className="overflow-y-auto max-h-[75px] scrollbar-none text-justify">Description : {props.card.description}</p>
      <div className="flex justify-center align-center">
        <button className='btn w-fit' onClick={() => navigate(`/exchange/${props.id}`)}>Trouver un échange</button>
      </div>
    </div >
  )
}

export default GameCardInfos;
