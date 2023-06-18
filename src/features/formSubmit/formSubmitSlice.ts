import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import type { FormData } from "@schema/RegistrationForm/dataTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./formSubmitAPI";
import { ServerResponse } from "./responseType";

export type FormDataState = FormData;

const initialState: FormDataState = {
	phoneNumber: 9999999999,
	email: "",
	nickname: "",
	name: "",
	surname: "",
	sex: "man",
	advantages: [{ value: "" }, { value: "" }, { value: "" }],
	checkbox: [],
	radio: 0,
	about: "",
};

export const formDataSlice = createSlice({
	name: "formData",
	initialState,
	reducers: {
		updateForm: (state, action: PayloadAction<Partial<FormData>>) => {
			const newState = Object.assign({}, state, action.payload);
			return newState;
		},
	},
});

export const { updateForm } = formDataSlice.actions;

export const selectFormData = (state: RootState) => state.formData;

export const formApi = createApi({
	reducerPath: "formApi",
	baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
	endpoints: (builder) => ({
		addFormData: builder.mutation<ServerResponse, FormData>({
			query: (body) => ({
				url: "/",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useAddFormDataMutation } = formApi;
export default formDataSlice.reducer;
