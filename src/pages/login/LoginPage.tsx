import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import {
	FormData,
	LoginPageData,
	loginPageSchema,
} from "@schema/RegistrationForm";
import { useAppDispatch } from "@hooks/store";
import { updateForm } from "@features/formSubmit/formSubmitSlice";
import { withHookFormMask } from "use-mask-input";
import { resetFormStep } from "@features/formStep/formStepSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { phonenumberTransform } from "@utils/helperFunctions";
import LoginHeader from "@components/LoginHeader/LoginHeader";
import { FormInput } from "@components/FormInput/FormInput";
import { Button } from "@components/Button/Button";

export function LoginPage() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>({
		mode: "onSubmit",
		reValidateMode: "onBlur",
		resolver: yupResolver(loginPageSchema),
		defaultValues: {
			phoneNumber: 9221919941,
			email: "ilyakosyakov1@yandex.ru",
		},
	});

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleStart = (data: LoginPageData) => {
		dispatch(updateForm(data));
		dispatch(resetFormStep());
		navigate("/create");
	};

	return (
		<div className={styles.loginPage}>
			<LoginHeader />
			<form
				onSubmit={(...args) => void handleSubmit(handleStart)(...args)}
				className={styles.loginPage__form}
			>
				<FormInput
					className={styles.loginPage__phone}
					type="tel"
					{...withHookFormMask(
						register("phoneNumber", {
							setValueAs: phonenumberTransform,
						}),
						["+7 (999) 999-99-99"]
					)}
					inputName={"phoneNumber"}
					inputLabel="Номер телефона"
					errors={errors.phoneNumber?.message}
					length="l"
				/>

				<FormInput
					className={styles.loginPage__email}
					type="email"
					{...register("email")}
					inputName={"email"}
					errors={errors.email?.message}
					length="l"
				/>
				<Button
					type="submit"
					id="button-start"
					className={styles.loginPage__button}
				>
					Начать
				</Button>
			</form>
		</div>
	);
}

export default LoginPage;
