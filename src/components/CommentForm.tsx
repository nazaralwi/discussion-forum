import { useState } from "react";

interface CommentFormProps {
  createComment: (content: string) => void;
  className?: string;
}

function CommentForm({ createComment, className }: CommentFormProps) {
  const [content, setContent] = useState<string>("");

  const onContentChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setContent(event.target.value);
  };

  const onCreateComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createComment(content);
    setContent("");
  };

  return (
    <>
      <form
        onSubmit={onCreateComment}
        className={`w-full bg-white p-6 rounded-lg border-2 border-gray-300 ${className}`}
      >
        <h1 className="text-base/7 font-semibold text-gray-900">
          Create Thread
        </h1>
        <div className="sm:col-span-4 mt-4">
          <label
            htmlFor="content"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Title
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <input
                type="text"
                name="content"
                id="content"
                value={content}
                onChange={onContentChangeHandler}
                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                placeholder="Content"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}

export default CommentForm;
