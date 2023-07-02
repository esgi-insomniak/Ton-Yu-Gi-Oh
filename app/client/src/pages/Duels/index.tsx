import React from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface Card {
    id: string;
    name: string;
}

const Duel = () => {
    const { roomId } = useParams<{ roomId: string }>();

    const handleDragEnd = (result: any) => {
        // Handle the drag and drop logic here
    };

    const cards: Card[] = [
        { id: 'card1', name: 'Card 1' },
        { id: 'card2', name: 'Card 2' },
        { id: 'card3', name: 'Card 3' },
    ];

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="h-full w-full flex flex-col">
                <div className="min-h-[45.5vh] w-full bg-gray-300 flex justify-center items-center">
                    Adversaire
                </div>
                <div className="min-h-[45.5vh] w-full bg-gray-100">
                    <Droppable droppableId="hand" key="hand">
                        {(provided) => (
                            <div
                                className="h-full w-full flex justify-center items-center"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {cards.map((card, index) => (
                                    <Draggable key={card.id} draggableId={card.id} index={index}>
                                        {(provided) => (
                                            <div
                                                className="h-1/2 w-1/4 bg-white rounded-md shadow-md p-4 m-4"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {card.name}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    );
};

export default Duel;
