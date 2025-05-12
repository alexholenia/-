import React, { createContext, ReactNode, useContext, useState } from 'react'

interface TaskProgress {
    clicks: number
    doubleClicks: number
    longPressed: boolean
    dragged: boolean
    swipeRight: boolean
    swipeLeft: boolean
    sizeChanged: boolean
    score: number
}

const initialProgress: TaskProgress = {
    clicks: 0,
    doubleClicks: 0,
    longPressed: false,
    dragged: false,
    swipeRight: false,
    swipeLeft: false,
    sizeChanged: false,
    score: 0
}

interface TaskContextType {
    progress: TaskProgress
    setProgress: React.Dispatch<React.SetStateAction<TaskProgress>>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const useTaskContext = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider')
    }
    return context
}

interface TaskProviderProps {
    children: ReactNode
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const [progress, setProgress] = useState<TaskProgress>(initialProgress)

    return <TaskContext.Provider value={{ progress, setProgress }}>{children}</TaskContext.Provider>
}
