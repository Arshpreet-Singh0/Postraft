import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div className="h-96 flex justify-center items-center text-white">
            <Loader2 className="animate-spin" size={35}/>
        </div>
    )
}

export default Loading