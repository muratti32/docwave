"use server";

import { parseStringify } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";

interface Props { userIds: string[] }
export const getClerkUsers = async (props: Props) => {
    const { userIds } = props
    console.log(`halo userIds:`, userIds);
    const { data } = await clerkClient.users.getUserList({
        emailAddress: userIds
    })

    console.log(`halo data:`, data);
    const users = data.map((user) => ({
        id: user.id,
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
        avatar: user.imageUrl,
    }))

    const sortedUsers = userIds.map((userId) => users.find((user) => user.email === userId))

    return parseStringify(sortedUsers)
}