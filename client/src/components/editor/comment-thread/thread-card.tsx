'use client'

import React from 'react'


export const ThreadCard = ({
    id,
    active,
    open,
    children,
    onClick,
} : {
    id: string,
    active: boolean,
    open: boolean,
    children: React.ReactNode,
    onClick: (id: string) => void,
}) => {
    const cardRef = React.useRef<HTMLDivElement>(null)
    const handleClick = React.useCallback(() => {
        if (onClick) {
            onClick(id)
        }
    }, [id, onClick])

    return (
        <div
            ref={cardRef}
            className={`thread${open ? ' is-open' : ''}${active ? ' is-active' : ''}`}
            onClick={handleClick}
        >
            {children}
        </div>
    )
}