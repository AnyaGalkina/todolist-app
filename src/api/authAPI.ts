import {CommonResType, instance} from "./todolistsAPI";
import {AxiosResponse} from "axios";


export const authAPI = {
    login(payload: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<CommonResType<{ userId?: number }>>>("/auth/login", payload);
    },
    me(){
        return instance.get<CommonResType<MeGetType>>("/auth/me");
    },
    logout() {
        return instance.delete<CommonResType>("/auth/login");
    }
}


export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string
}


type MeGetType = {
    id: number
    login: string
    email: string
}

