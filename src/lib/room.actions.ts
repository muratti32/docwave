
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
                defaultAccesses: []
            }

        )

        revalidatePath("/")

        return parseStringify(room)
    } catch (error: any) {
        console.log(`halo erron happend while createing a room:`,);
    }
}