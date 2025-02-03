import { useParams } from "react-router";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { ThreadDetail } from "../utils/models";
import { assertString } from "../utils/asserts";

function ThreadDetailPage() {
  const { id } = useParams();
  const [thread, setThread] = useState<ThreadDetail>({
    id: "",
    title: "",
    body: "",
    category: "",
    createdAt: "",
    owner: {
      id: "",
      name: "",
      email: "",
      avatar: "",
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [],
  });

  useEffect(() => {
    async function fetchThreadDetail() {
      assertString(id);
      const threadDetail = await api.getThreadDetail(id);
      setThread(threadDetail);
    }

    fetchThreadDetail();
  }, [id]);

  return (
    <>
      <main className="flex flex-1 p-4 justify-center items-center">
        <div key={thread.id}>
          <h3>{thread.title}</h3>
          <h3>{thread.body}</h3>
        </div>
      </main>
    </>
  )
}

export default ThreadDetailPage;
