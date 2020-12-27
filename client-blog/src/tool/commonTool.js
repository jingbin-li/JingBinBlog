import axios from "axios";
const getComments = async (articleId, commentType) => {
  return await axios.get("/api/v1/comments/commentsList", {
    params: {
      articleId,
      commentType,
    },
  });
};
export default getComments;
