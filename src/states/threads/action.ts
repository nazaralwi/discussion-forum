import { Dispatch } from '@reduxjs/toolkit';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_ALL_THREADS: 'RECEIVE_ALL_THREADS'
};

type Thread = {
  id: string,
  title: string,
  body: string,
  category: string,
  createdAt: string,
  ownerId: string,
  totalComments: number,
  upVotesBy: Array<string>,
  downVotesBy: Array<string>
}

function receiveAllThreadsActionCreator(threads: Array<Thread>) {
  return {
    type: ActionType.RECEIVE_ALL_THREADS,
    payload: {
      threads
    }
  }
}

async function asyncReceiveAllThreads() {
  return async (dispatch: Dispatch) => {
    try {
      const threads = await api.getAllThreads();
      dispatch(receiveAllThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
  }
}

export {
  ActionType,
  receiveAllThreadsActionCreator,
  asyncReceiveAllThreads
}