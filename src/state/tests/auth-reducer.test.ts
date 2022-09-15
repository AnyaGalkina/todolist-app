import {authReducer, setIsLoggedIn} from "../../features/Login/auth-reducer";

let  initialState;

beforeEach(() => {
    initialState = {
        isLoggedIn: false
    }
})

test("isLoggedIn should be true", () => {
    const newState = authReducer(initialState, setIsLoggedIn({isLoggedIn: true}));
    expect(newState.isLoggedIn).toBeTruthy();
})