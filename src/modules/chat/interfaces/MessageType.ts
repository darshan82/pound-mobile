export interface MessageType {
    content: string;
    author: string;
    avatar: string;
    createdAt: number;
    color: string;
    reply?: {
        content: string;
        author: string;
        avatar: string;
        createdAt: number;
        color: string;
    }
}