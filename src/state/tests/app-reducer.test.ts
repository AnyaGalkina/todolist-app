import {appReducer, setAppError, setAppStatus, setIsInitialized} from "../../app/app-reducer";


let state;

beforeEach(() => {
    state = {
        status: "idle",
        error: null,
        isInitialized: false
    }
})

test("status should be changed", () => {
    const newState = appReducer(state, setAppStatus({status:"loading"}));

    expect(newState.status).toBe("loading");
    expect(newState.error).toBe(null);
    expect(state.status).toBe("idle");
})

test("error should be set", () => {
    const newState = appReducer(state, setAppError({error: "Some error occurred"}));

    expect(newState.error).toBe("Some error occurred");
    expect(newState.status).toBe("idle");
    expect(state.error).toBe(null);
})

test("isInitialized should be changed to true", () => {
    const newState = appReducer(state, setIsInitialized({isInitialized: true}));

    expect(newState.isInitialized).toBeTruthy();
})