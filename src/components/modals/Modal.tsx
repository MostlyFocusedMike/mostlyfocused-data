import { ReactNode, useId, useRef, useState } from "react";

type Props = {
  openBtnText: string;
  heading: string;
  handleClose?: (e: React.SyntheticEvent<HTMLDialogElement>) => void;
  children: ReactNode;
}

export default function Modal({
  openBtnText,
  heading,
  handleClose = () => { },
  children
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const formId = useId();

  const openModal = () => {
    setIsVisible(true);
    dialogRef?.current?.showModal();
  };
  const closeModal = () => {
    setIsVisible(false);
    dialogRef?.current?.close();
  };
  const _handleClose = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    setIsVisible(false);
    handleClose(e);
  };

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
      onClose={_handleClose}
    >
      <form method="dialog"><button aria-label="Close modal">X</button></form>
      <h2 id={formId}>{heading}</h2>
      {isVisible && children}
    </dialog>
  </>
}
