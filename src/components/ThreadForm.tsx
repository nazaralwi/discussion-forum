import React, { useState } from 'react';

interface ThreadFromProps {
  createThread: (title: string, body: string, category: string | undefined) => void;
  categories: string[];
  className?: string;
}

function ThreadForm({ createThread, categories, className }: ThreadFromProps) {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [category, setCategory] = useState<string | undefined>('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>('');
  const [customCategory, setCustomCategory] = useState<string | undefined>('');

  const onTitleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onBodyChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  const onCategorySelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value ? event.target.value : undefined);
    setCategory(event.target.value ? event.target.value : undefined);
  };

  const onCustomCategoryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCategory(event.target.value ? event.target.value : undefined);
    setCategory(event.target.value ? event.target.value : undefined);
  };

  const onCreateThread = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createThread(title, body, category);
    setTitle('');
    setBody('');
    setCategory('');
  };

  console.log(categories);

  return (
    <>
      <form
        onSubmit={onCreateThread}
        className={`max-w-md w-full bg-white p-6 rounded-lg border-2 border-gray-300 ${className}`}
      >
        <h1 className="text-base/7 font-semibold text-gray-900">
          Create Thread
        </h1>
        <div className="sm:col-span-4 mt-4">
          <label
            htmlFor="title"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Title
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={onTitleChangeHandler}
                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                placeholder="Title"
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-4 mt-4">
          <label
            htmlFor="body"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Body
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <input
                type="text"
                name="body"
                id="body"
                value={body}
                onChange={onBodyChangeHandler}
                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                placeholder="Body"
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-4 mt-4">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-900"
          >
            Category (optional)
          </label>
          <div className="mt-2 space-y-2">
            <select
              name="category"
              id="category"
              value={selectedCategory && categories.includes(selectedCategory) ? selectedCategory : selectedCategory === '__custom__' ? '__custom__' : ''}
              onChange={onCategorySelectHandler}
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">-- Select category --</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
              <option value="__custom__">+ Custom...</option>
            </select>
            {(selectedCategory && !categories.includes(selectedCategory) && selectedCategory !== '') && (
              <input
                type="text"
                name="category"
                id="category"
                value={customCategory}
                onChange={onCustomCategoryChangeHandler}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Category"
              />)
            }
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

export default ThreadForm;
