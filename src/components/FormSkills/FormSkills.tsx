import { useForm, useWatch } from "react-hook-form";
import {
	FormData,
	FormDataPart3,
	formDataSchema,
	formPart3Schema,
} from "@schema/RegistrationForm";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { decrementFormStep } from "@features/formStep/formStepSlice";
import {
	selectFormData,
	updateForm,
	useAddFormDataMutation,
} from "@features/formSubmit/formSubmitSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./FormSkills.module.scss";
import { createPortal } from "react-dom";
import {
	showModalError,
	showModalSuccess,
} from "@features/showModal/showModalSlice";
import { ServerResponse } from "@features/formSubmit/responseType";
import { Modal } from "@components/Modal/Modal";
import { Button } from "@components/Button/Button";
import { Tip } from "@components/Tip/Tip";

export function FormSkills() {
	const savedValues = useAppSelector(selectFormData);
	const {
		register,
		getValues,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormData>({
		mode: "onSubmit",
		reValidateMode: "onBlur",
		resolver: yupResolver(formPart3Schema),
		defaultValues: savedValues,
	});

	const dispatch = useAppDispatch();
	const [addFormData] = useAddFormDataMutation();

	const watchAbout = useWatch({
		control,
		name: "about",
		defaultValue: "",
	}).replaceAll(" ", "");

	const backStepHandle = () => {
		dispatch(updateForm(getValues()));
		dispatch(decrementFormStep());
	};

	const onFetch = async (formSubmit: Partial<FormData>) => {
		if (formDataSchema.isValidSync(formSubmit)) {
			await addFormData(formSubmit)
				.unwrap()
				.then((payload: ServerResponse) =>
					payload.status === "success"
						? dispatch(showModalSuccess())
						: dispatch(showModalError())
				)
				.catch(() => dispatch(showModalError()));
		} else {
			dispatch(showModalError());
		}
	};

	const onSubmit = (data: FormDataPart3) => {
		const storeData = dispatch(updateForm(data)).payload;
		return onFetch(storeData);
	};

	return (
		<>
			<form
				onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
				className={styles.form3}
			>
				<label htmlFor="field-about" className={styles.form3__about}>
					<div className={styles.form3__about_container}>
						About
						<textarea
							className={styles.form3__input}
							{...register("about")}
							id="field-about"
						></textarea>
					</div>
					<Tip className={styles.form3__about_error}>
						{errors.about?.message}
					</Tip>
					<div className={styles.form3__about_count}>
						Symbol count: {watchAbout.length}
					</div>
				</label>
				<Button
					type="button"
					onClick={backStepHandle}
					id="button-back"
					style="border"
					className={styles.form3__button_back}
				>
					Back
				</Button>
				<Button
					type="submit"
					id="button-send"
					className={styles.form3__button_submit}
				>
					Submit
				</Button>
			</form>
			{createPortal(<Modal />, document.body)}
		</>
	);
}

export default FormSkills;
