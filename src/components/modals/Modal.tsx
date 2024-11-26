import { ReactNode, useId, useRef } from "react";

type Props = {
  openBtnText: string;
  modalLabel: string;
  submitBtnText?: string;
  handleClose?: (e: React.SyntheticEvent<HTMLDialogElement>) => void;
  children: ReactNode;
}

export default function Modal(props: Props) {
  const {
    openBtnText,
    modalLabel,
    handleClose = () => { },
    children
  } = props;
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const formId = useId();

  const openModal = () => dialogRef?.current?.showModal();
  const closeModal = () => dialogRef?.current?.close();

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (!target.matches('dialog')) return;

    const { top, bottom, left, right } = target.getBoundingClientRect();
    const { clientX: mouseX, clientY: mouseY } = e;

    if (!mouseX && !mouseY) return;

    const clickedOutsideOfModalBox = (
      mouseX <= left || mouseX >= right || mouseY <= top || mouseY >= bottom
    );

    if (clickedOutsideOfModalBox) closeModal();
  }

  return <>
    <button onClick={openModal}>{openBtnText}</button>

    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={handleClose}
    >
      <form method="dialog"><button aria-label="Close modal">X</button></form>
      <h2 id={formId}>{modalLabel}</h2>
      {children}
    </dialog>
  </>
}
