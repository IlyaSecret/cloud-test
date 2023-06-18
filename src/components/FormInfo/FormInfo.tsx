import { useForm } from "react-hook-form";
import {
	FormData,
	FormDataPart2,
	formPart2Schema,
} from "@schema/RegistrationForm";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import {
	incrementFormStep,
	decrementFormStep,
} from "@features/formStep/formStepSlice";
import {
	selectFormData,
	updateForm,
} from "@features/formSubmit/formSubmitSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./FormInfo.module.scss";
import { Advantages } from "@components/Advantages/Advantages";
import { CheckBoxGroup } from "@components/CheckBoxGroup/CheckBoxGroup";
import { RadioGroup } from "@components/RadioGroup/RadioGroup";
import { Button } from "@components/Button/Button";

export function FormInfo() {
	const savedValues = useAppSelector(selectFormData);
	const { register, getValues, handleSubmit, control } = useForm<FormData>({
		mode: "onSubmit",
		reValidateMode: "onBlur",
		resolver: yupResolver(formPart2Schema),
		defaultValues: savedValues,
	});

	const dispatch = useAppDispatch();

	const handleBackStep = () => {
		dispatch(updateForm(getValues()));
		dispatch(decrementFormStep());
	};
	const handleNextStep = (data: FormDataPart2) => {
		dispatch(updateForm(data));
		dispatch(incrementFormStep());
	};

	return (
		<form
			onSubmit={(...args) => void handleSubmit(handleNextStep)(...args)}
			className={styles.form2}
		>
			<Advantages
				control={control}
				register={register}
				className={styles.form2__advantages}
			/>

			<CheckBoxGroup
				register={register}
				values={["1", "2", "3"]}
				className={styles.form2__checkbox}
			/>

			<RadioGroup
				values={["1", "2", "3"]}
				register={register}
				className={styles.form2__radio}
			/>

			<Button
				className={styles.form2__button_back}
				type="button"
				onClick={handleBackStep}
				id="button-back"
				style="border"
			>
				Back
			</Button>
			<Button
				className={styles.form2__button_next}
				type="submit"
				id="button-next"
			>
				Next
			</Button>
		</form>
	);
}

export default FormInfo;
