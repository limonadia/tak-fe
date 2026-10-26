export interface User{
    id?: number;   
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    city?: string;
    birthday?: string;
    profilePicture?: string;
    description?: string;
    language?: Language;
    theme?: Theme;
    createdAt?: Date;
    strikesCount?: number;
    preferences?: string[];
}

enum Language {
    DARK = "dark",
    LIGHT = "light"
}

enum Theme {
    EN = "en",
    AL = "al"
}

export interface LoginResponse {
    token: string;
}

export interface LoginRequestBody {
    email: string;
    password: string;
}
