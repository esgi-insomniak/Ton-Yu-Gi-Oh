interface ChatProps {
    me: boolean
    author: string
    sendAt: string
    message: string
}

export const ChatBubble = ({ me, author, sendAt, message }: ChatProps) => {
    return (
        <div className={`chat chat-${me ? 'end' : 'start'}`}>
            <div className="chat-header">
                {author}
                <time className="text-xs opacity-50">{sendAt}</time>
            </div>
            <div className={`chat-bubble ${me ? 'chat-bubble-info' : 'chat-bubble-accent'} `}>{message}</div>
        </div>
    )
}