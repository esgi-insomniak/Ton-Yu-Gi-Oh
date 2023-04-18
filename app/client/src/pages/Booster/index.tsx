import React from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

const Booster = () => {
    const bacthBooster = [
        { id: 1, name: "Booster 1" },
        { id: 2, name: "Booster 2" },
        { id: 3, name: "Booster 3" },
    ]
    return (
        <DragDropContext onDragEnd={
            (result) => result.destination && console.log(result)
        }>
            <div className="flex w-full h-screen">
                <div className="flex flex-col w-1/3 overflow-scroll">
                    {bacthBooster.map((booster, index) => (
                        <Draggable key={booster.id} draggableId={booster.id.toString()} index={index}>
                            {dragProvided => (
                                <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps}>
                                    <div className="t-nav-items">
                                        <h1>{booster.name}</h1>
                                    </div>
                                </div>
                            )}
                        </Draggable>
                    ))}
                </div>
                <div className="flex justify-center items-center w-2/3">
                    <Droppable droppableId="booster_drop">
                        {dropProvided => (
                            <div ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                                <div className="t-nav-items">
                                    <h1>Drop me</h1>
                                </div>
                                {dropProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    )
}

export default Booster