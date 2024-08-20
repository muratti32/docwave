"use server";

import { liveblocks } from "@/lib/liveblocks";
import { parseStringify } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";

interface Props { userIds: string[] }
export const getClerkUsers = async (props: Props) => {
    const { userIds } = props
    const { data } = await clerkClient.users.getUserList({
        emailAddress: userIds
    })

    const users = data.map((user) => ({
        id: user.id,
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
        avatar: user.imageUrl,
    }))

    if (!users.length) return []

    const sortedUsers = userIds.map((userId) => users.find((user) => user.email === userId))

    return parseStringify(sortedUsers)
}

export const getDocumentUsers = async ({ roomId, currentUser, text }: { roomId: string, currentUser: string, text: string }) => {
    try {
        const room = await liveblocks.getRoom(roomId)
        if (!room) return []
        const users = Object.keys(room.usersAccesses).filter((userId) => userId !== currentUser)
        if (!users.length) return []
        if (text) {
            const loverCaseText = text.toLowerCase()
            const filteredUsdr = users.filter((userId) => {
                const user = room.usersAccesses[userId]
                return user?.filter(user => user.toLowerCase().includes(loverCaseText))
            })
            return parseStringify(filteredUsdr)
        }
        return parseStringify(users)

    } catch (error: any) {
        console.log(`halo get document users error :`, error);
        throw new Error("Document not found")
    }
}