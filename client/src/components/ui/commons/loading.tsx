'use client'

export default function Loading() {
    return(
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-4 gap-2 mb-8">
                <div className="col-span-2 row-span-2 h-96 bg-gray-200 rounded"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
            </div>
            </div>
        </div>
    )
}