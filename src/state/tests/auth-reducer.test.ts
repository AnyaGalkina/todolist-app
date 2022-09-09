import {authReducer, InitialStateType, setIsLoggedInAC} from "../../features/Login/auth-reducer";

let  initialState: InitialStateType;

beforeEach(() => {
    initialState = {
        isLoggedIn: false
    }
})

test("isLoggedIn should be true", () => {
    const newState = authReducer(initialState, setIsLoggedInAC(true));
    expect(newState.isLoggedIn).toBeTruthy();
})