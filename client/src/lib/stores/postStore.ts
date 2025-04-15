// Example: Create a store for posting
// This store will handle the state of the post creation process
// This is just an example, feel free to modify it as per your requirements


import { create } from 'zustand'
import { devtools, subscribeWithSelector, persist } from 'zustand/middleware'

const initialPostValues = {

    formData: {
        type: "",
        title: "",
        description: "",
        amount: 0,
        category: "",
        date: "",
    }
}

export const useTransactionStore = create<typeof initialPostValues>()(
    devtools(
        subscribeWithSelector(
            persist(() => initialPostValues, { name : "Post store" })
        ),
        { name : "Post store"}
    )
)
