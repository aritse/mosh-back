const chats = [];

const addChat = ({ id, txName, rxName }) => {
  txName = txName.trim().toLowerCase();
  rxName = rxName.trim().toLowerCase();

  const existingChat = chats.find(chat => chat.txName === txName && chat.rxName === rxName);

  if (existingChat) return { error: "chat already exists" };
  const chat = { id, txName, rxName };
  chats.push(chat);
  return { chat };
};

const removeChat = id => {
  const index = chats.findIndex(chat => chat.id === id);
  if (index !== -1) return chats.splice(index, 1)[0];
};

const getChat = id => chats.find(chat => chat.id === id);

module.exports = { addChat, removeChat, getChat };
