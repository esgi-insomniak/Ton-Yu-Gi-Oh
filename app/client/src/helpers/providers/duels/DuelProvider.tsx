import { IDuelCardInField } from "@/helpers/types/duel";
import { createContext, useContext, useEffect, useState } from "react";

interface DuelContextProps {
    children: React.ReactNode;
}

const initialState = {
    currentPlayerField: new Array(5).fill(null) as IDuelCardInField[],
    opponentPlayerField: new Array(5).fill(null) as IDuelCardInField[],
    setCurrentPlayerField: (fieldState: IDuelCardInField, position: number) => { },
    setOpponentPlayerField: (fieldState: IDuelCardInField, position: number) => { },
};


export const DuelContext = createContext(initialState);

export const DuelProvider = ({ children }: DuelContextProps) => {
    const [currentPlayerField, setCurrentPlayerField] = useState<IDuelCardInField[]>(new Array(5).fill(null));
    const [opponentPlayerField, setOpponentPlayerField] = useState<IDuelCardInField[]>(new Array(5).fill(null));

    const handleUpdateCurrentPlayerField = (newFieldState: IDuelCardInField, position: number) => {
        setCurrentPlayerField(currentPlayerField.map((field, index) => {
            if (index === position) return newFieldState;
            return field;
        }))
    }

    const handleUpdateOpponentPlayerField = (newFieldState: IDuelCardInField, position: number) => {
        setOpponentPlayerField(opponentPlayerField.map((field, index) => {
            if (index === position) return newFieldState;
            return field;
        }))
    }

    const contextValues = {
        currentPlayerField,
        setCurrentPlayerField: handleUpdateCurrentPlayerField,
        opponentPlayerField,
        setOpponentPlayerField: handleUpdateOpponentPlayerField,
    }

    return (
        <DuelContext.Provider value={contextValues}>
            {children}
        </DuelContext.Provider>
    )
}

export const useDuel = () => {
    const context = useContext(DuelContext);
    if (context === undefined) {
        throw new Error("useDuel must be used within a DuelProvider");
    }
    return context;
}