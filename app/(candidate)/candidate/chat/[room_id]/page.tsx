import type { Metadata } from "next";
import ChatRoomClient from "@/components/shared/chat/chat-room-client";

interface PageProps {
  params: Promise<{ room_id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { room_id } = await params;
  return {
    title: `Chat Session | Messages | AI Recruite`,
    description: `Direct conversation for room ${room_id}`,
  };
}

export default async function CandidateChatRoomPage({ params }: PageProps) {
  const { room_id } = await params;
  return <ChatRoomClient roomId={room_id} />;
}