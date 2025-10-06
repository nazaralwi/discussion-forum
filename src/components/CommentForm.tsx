import { useEffect, useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

interface CommentFormProps {
  createComment: (content: string) => void;
  className?: string;
}

function CommentForm({ createComment, className }: CommentFormProps) {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const editorWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorWrapperRef.current) {
      const el = editorWrapperRef.current.querySelector('.editor-class');
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }
  }, [editorState]);

  const onEditorStateChangeHandler = (state: EditorState) => {
    setEditorState(state);
  };

  const onCreateComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const htmlBody = draftToHtml(rawContentState);
    createComment(htmlBody);
    setEditorState(EditorState.createEmpty());
  };

  return (
    <>
      <form
        onSubmit={onCreateComment}
        className={`w-ful p-6 rounded-md shadow-sm border border-neutral-200 ${className} bg-white`}
      >
        <h1 className="text-base/7 font-semibold text-gray-900">
          Create Comment
        </h1>
        <div className="sm:col-span-4 mt-4">
          <label
            htmlFor="content"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Comment
          </label>
          <div className="mt-2">
            <Editor
              editorState={editorState}
              toolbarClassName="comment-toolbar-class"
              wrapperClassName="comment-wrapper-class"
              editorClassName="comment-editor-class"
              onEditorStateChange={onEditorStateChangeHandler}
            />
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
