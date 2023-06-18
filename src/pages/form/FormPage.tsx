import { useAppSelector } from "@hooks/store";
import { selectFormStep } from "@features/formStep/formStepSlice";
import styles from "./FormPage.module.scss";
import FormProgress from "@components/FormProgress/FormProgress";
import CustomForm from "@components/CustomForm/CustomForm";

export function FormPage() {
	const step = useAppSelector(selectFormStep);

	return (
		<div className={styles.formPage}>
			<FormProgress step={step} />
			<CustomForm />
		</div>
	);
}

export default FormPage;
