import { useNavigate } from "react-router-dom";
import styles from "./ModalSuccess.module.scss";
import { useAppDispatch } from "@hooks/store";
import { hideModal } from "@features/showModal/showModalSlice";
import ModalGreenSuccess from "@assets/ModalGreenSuccess.svg";
import { Button } from "@components/Button/Button";

export function ModalSuccess() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(hideModal());
		navigate("/");
	};
	return (
		<div className={styles.modal__success}>
			<h1 className={styles.modal__title}>Form send successfull</h1>
			<img
				src={ModalGreenSuccess}
				alt="success icon"
				className={styles.modal__successIcon}
			/>
			<Button
				type="button"
				onClick={handleClick}
				id="button-to-main"
				className={styles.modal__button}
			>
				Back to main
			</Button>
		</div>
	);
}

export default ModalSuccess;
