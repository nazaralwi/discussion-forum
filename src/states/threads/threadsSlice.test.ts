import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk"; // ✅ BENAR!
import { fetchThreads } from "./threadsSlice";
import api from "../../utils/api";
import { Thread } from "../../utils/models";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("../../utils/api");

describe("threadsSlice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle fetchThreads.fulfilled", async () => {
    const fakeThreads: Thread[] = [
      { id: "1", title: "Thread 1", body: "body", upVotesBy: [], downVotesBy: [], ownerId: "user1", totalComments: 0, createdAt: "", category: "" },
    ];

    (api.getAllThreads as jest.Mock).mockResolvedValue(fakeThreads);

    const store = mockStore({ profile: { profile: { id: "user1" } } });

    await store.dispatch<any>(fetchThreads());

    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "loading-bar/SHOW" }),
        expect.objectContaining({ type: fetchThreads.fulfilled.type, payload: fakeThreads }),
        expect.objectContaining({ type: "loading-bar/HIDE" }),
      ])
    );
  });
});
