import { GoogleTokenPayload } from "../interfaces/googleToken";

const url = "https://backedn-server.onrender.com";
export const addUser = async (credentialResponse: GoogleTokenPayload) => {
  try {
    await fetch(url + "/addUser/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentialResponse),
    });
  } catch (error) {
    console.log("failed to add user");
  }
};

export const getUsers = async () => {
  try {
    const res = await fetch(url + "/getUsers/", {
      method: "GET",
    });
    const data = res.json();
    return data;
  } catch (err) {
    console.log("Error occureed while fetching users");
  }
};
interface conversationData {
  senderId: string;
  receiverId: string;
}
export const setConversation = async (datad: conversationData) => {
  try {
    await fetch(url + "/conversation/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datad),
    });
  } catch (err) {
    console.log("Error occureed while loading conversations");
  }
};

export const getConversation = async (datad: conversationData) => {
  try {
    const res = await fetch(url + "/conversation/get/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(datad),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error occureed while loading conversation");
  }
};
export const newMessage = async (message: {
  senderId: string | undefined;
  receiverId: string | undefined;
  conversationId: string;
  type: string;
  text: string;
}) => {
  try {
    await fetch(url + "/new-message/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(message),
    });
  } catch (err) {
    console.log("Error occureed while sending message");
  }
};

export const getMessages = async (id: string) => {
  try {
    const res = await fetch(url + `/get-messages/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error occureed while fetching messages");
  }
};

export const uploadFile = async (data: FormData) => {
  try {
    const res = await fetch(url + "/upload/", {
      method: "POST",
      body: data,
    });
    const resData = await res.json();
    return resData;
  } catch (err) {
    console.log("Error occureed while uploading file");
  }
};
