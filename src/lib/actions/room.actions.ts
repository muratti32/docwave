
"use server";
import { liveblocks } from '@/lib/liveblocks'
import { parseStringify } from '@/lib/utils'
import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache'

export const createDocument = async (props: CreateDocumentParams) => {
    const { email, userId } = props
    const roomId = nanoid()
    try {
        const metaData = {
            creatorId: userId,
            email,
            title: 'Untitled Document',
        }

        const usersAccesses: RoomAccesses = {
            [email]: ["room:write"]
        }
        const room = await liveblocks.createRoom(
            roomId,
            {
                metadata: metaData,
                usersAccesses,
                defaultAccesses: ["room:write"]
            }

        )

        revalidatePath("/")

        return parseStringify(room)
    } catch (error: any) {
        console.log(`halo erron happend while createing a room:`,);
    }
}

export const getDocument = async ({ roomId, userId }: { roomId: string, userId: string }) => {
    try {
        const room = await liveblocks.getRoom(roomId)

        //TODO: Bring this back when we have the access control
        // const hasAccess = Object.keys(room.usersAccesses).includes(userId)
        // if (!hasAccess) {
        //     throw new Error("You don't have access to this document")
        // }
        return parseStringify(room)
    } catch (error) {
        console.log(`halo get document error :`, error);
        throw new Error("Document not found")
    }
}

export const updateDocument = async (roomId: string, title: string) => {
    try {
        const room = await liveblocks.updateRoom(roomId, {
            metadata: {
                title
            }
        })
        revalidatePath(`/documents/${roomId}`)
        return parseStringify(room)
    } catch (error) {
        console.log(`halo error updating document:`, error);
        throw new Error("Error updating the document")
    }
}