export interface message {
  _id?: string;
  senderId?: string;
  receiverId?: string;
  conversationId?: string;
  type?: string;
  text?: string;
  createdAt?: string;
}
