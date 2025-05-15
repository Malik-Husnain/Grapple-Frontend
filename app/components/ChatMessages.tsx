// Define types for the individual message content
interface MessageContent {
  type: string;
  text: {
    value: string;
    annotations: any[];
  };
  attachments: any[];
  metadata: any;
}

// Define the structure of a message
interface ChatMessage {
  id: string;
  object: string;
  created_at: number;
  assistant_id: string | null;
  thread_id: string;
  run_id: string | null;
  role: "user" | "assistant"; // User or assistant
  content: MessageContent[];
  attachments: any[];
  metadata: any;
  user: {
    email: string;
    name: string;
    icon_url: string | null;
    is_you: boolean;
  };
}

// Define props for the component
interface ChatMessagesProps {
  messages: ChatMessage[]; // Array of chat messages
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="flex flex-col gap-y-2 p-4 overflow-y-auto bg-gray-100 rounded-md">
      {messages.map((message) => {
        console.log({ message });

        const messageContent = message.content[0]?.text?.value || "";
        const sender = message.role === "user" ? message.user?.name : "Assistant";
        const time = new Date(message.created_at * 1000).toLocaleString();
        const messageType = message.role;
        const isUser = messageType === "user";

        return (
          <div
            key={message.id}
            className={`flex flex-col rounded-lg shadow-sm py-2 px-3 w-fit max-w-[80%] ${
              isUser ? "bg-green-100 self-end" : "bg-blue-100 self-start"
            }`}
          >
            <div className="flex justify-between items-baseline mb-1 text-sm text-gray-600">
              <strong className="font-semibold">{sender}</strong>
              <span className="text-xs text-gray-500">{time}</span>
            </div>
            <em className="text-xs text-gray-700 mb-1">Type: {messageType}</em>
            <div className="text-gray-800 whitespace-pre-wrap">{messageContent}</div>
          </div>
        );
      })}
    </div>
  );
};

export { ChatMessages };
