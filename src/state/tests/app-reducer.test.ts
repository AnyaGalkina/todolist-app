import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";

let state: InitialStateType;

beforeEach(() => {
    state = {
        status: "idle",
        error: null
    }
})

test("status should be changed", () => {
    const newState = appReducer(state, setAppStatusAC("loading"));

    expect(newState.status).toBe("loading");
    expect(newState.error).toBe(null);
    expect(state.status).toBe("idle");
})

test("error should be set", () => {
    const newState = appReducer(state, setAppErrorAC("Some error occurred"));

    expect(newState.error).toBe("Some error occurred");
    expect(newState.status).toBe("idle");
    expect(state.error).toBe(null);
})