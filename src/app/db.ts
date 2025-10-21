import { Post } from "./types";

export const posts: Post[] = [
  {
    id: crypto.randomUUID(),
    content: "Je suis super content de faire ce post",
    author: {
      id: crypto.randomUUID(),
      username: "JohnDoe98",
      pseudo: "Jojo",
      avatar: "https://picsum.photos/200/300",
    },
    pictures: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/500",
    ],
    likes: 18,
    comments: 3,
    reposts: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    content: "Je m'appelle JAJA et ce post est un INCRRRR",
    author: {
      id: crypto.randomUUID(),
      username: "JaneDoe99",
      pseudo: "JAJA",
      avatar: "https://picsum.photos/200/300?avatar",
    },
    pictures: ["https://picsum.photos/200/300"],
    likes: 2,
    comments: 10,
    reposts: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    content: "Bonjour je suis Zinedine Zidane le célèbre footballeur chauve",
    author: {
      id: crypto.randomUUID(),
      username: "ZZ10",
      pseudo: "Zizou",
      avatar: "https://picsum.photos/200/300?grayscale",
    },
    likes: 99,
    comments: 54,
    reposts: 33,
    pictures: ["https://picsum.photos/200/300"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
