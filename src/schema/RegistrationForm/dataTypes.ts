export type LoginPageData = {
	phoneNumber: number;
	email: string;
};

export type FormDataPart1 = {
	nickname: string;
	name: string;
	surname: string;
	sex: "man" | "woman";
};

export type FormDataPart2 = {
	advantages: { value: string }[];
	checkbox: number[];
	radio: number;
};
export type FormDataPart3 = {
	about: string;
};
export type FormData = LoginPageData &
	FormDataPart1 &
	FormDataPart2 &
	FormDataPart3;
