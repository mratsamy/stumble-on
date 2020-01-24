import React from "react"

import "./messages.module.css"

type messages = Map<string, Set<string>>
type Props = {
    messages?: messages
    messageType?: "success" | "warning" | "error"
}

function getMessages(codes: messages): string[] {
    function uppercase(text: string): string {
        return text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase()
    }

    const messages = []

    for (let [key, values] of codes) {
        for (let value of values) {
            messages.push(`${uppercase(key)}: ${uppercase(value)}`)
        }
    }

    return messages
}

export default function Messages({ messages, messageType = "error" }: Props): JSX.Element {
    if (!messages || !messages.size) return null

    return (
        <div className={`messages ${messageType}`}>
            <ul>
                {getMessages(messages).map((lineItem) => (
                    <li>{lineItem}</li>
                ))}
            </ul>
        </div>
    )
}
