/*Comments Zome*/
interface CreateCommentsParams {
  comment: "string";
  commentedOnHash: "string";
}

interface Comments {
  author: "string";
  comment: "string";
  timestamp: "string"
}

type Reply = Comment_Chain[]

interface Comment_Chain {
  comment: Comment;
  reply: Reply;
}

/*HCHC Zome Params*/
interface CreateAppParams {
  title: string;
  description?: string;
  thumbnail?: string;
}

interface CreateAppParams {
  title: string;
  description?: string;
  thumbnail?: string;
}

interface CodeParams {
  dna: string;
  test: string;
}

interface UiSkinParams {
  title: string;
  link: string;
  author: string;
  thumbnail?: string;
}
