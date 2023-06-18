import styles from "./Modal.module.scss";
import { useAppSelector } from "@hooks/store";
import { selectShowModal } from "@features/showModal/showModalSlice";
import { ModalSuccess } from "./ModalSuccess/ModalSuccess";
import { ModalError } from "./ModalError/ModalError";

export function Modal() {
	const modalState = useAppSelector(selectShowModal);

	return modalState.show ? (
		<div className={styles.modal}>
			<div className={styles.modal__body}>
				{modalState.isSuccessfull ? <ModalSuccess /> : <ModalError />}
			</div>
		</div>
	) : (
		<></>
	);
}

export default Modal;
