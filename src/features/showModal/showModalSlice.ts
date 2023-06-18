import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

export interface ShowModalState {
	show: boolean;
	isSuccessfull: boolean;
}

const initialState: ShowModalState = {
	show: false,
	isSuccessfull: false,
};

export const showModalSlice = createSlice({
	name: "showModal",
	initialState,
	reducers: {
		showModalSuccess: () => {
			return { show: true, isSuccessfull: true };
		},
		showModalError: () => {
			return { show: true, isSuccessfull: false };
		},
		hideModal: () => {
			return { show: false, isSuccessfull: false };
		},
	},
});

export const { showModalSuccess, showModalError, hideModal } =
	showModalSlice.actions;

export const selectShowModal = (state: RootState) => state.showModal;

export default showModalSlice.reducer;
