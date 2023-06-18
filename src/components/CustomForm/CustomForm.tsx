import { useAppSelector } from "@hooks/store";
import { selectFormStep } from "@features/formStep/formStepSlice";
import { FormContacts } from "@components/FormContacts/FormContacts";
import { FormSkills } from "@components/FormSkills/FormSkills";
import FormInfo from "@components/FormInfo/FormInfo";

export function CustomForm() {
	const step = useAppSelector(selectFormStep);

	return (
		<>
			{step === 1 && <FormContacts />}
			{step === 2 && <FormInfo />}
			{step === 3 && <FormSkills />}
		</>
	);
}

export default CustomForm;
