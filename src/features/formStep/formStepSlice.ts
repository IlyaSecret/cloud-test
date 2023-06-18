import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

export interface FormStepState {
	value: number;
}

const initialState: FormStepState = {
	value: 1,
};

export const formStepSlice = createSlice({
	name: "formStep",
	initialState,
	reducers: {
		resetFormStep: (state) => {
			state.value = 1;
		},
		incrementFormStep: (state) => {
			state.value += 1;
		},
		decrementFormStep: (state) => {
			state.value -= 1;
		},
	},
});

export const { incrementFormStep, decrementFormStep, resetFormStep } =
	formStepSlice.actions;

export const selectFormStep = (state: RootState) => state.formStep.value;

export default formStepSlice.reducer;
