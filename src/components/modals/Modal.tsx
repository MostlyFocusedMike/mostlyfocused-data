import { ReactNode, useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "react-router";

type Props = {
  openBtnText: string;
  heading: string;
  handleClose?: (e: React.SyntheticEvent<HTMLDialogElement>) => void;
  children: ReactNode;
}

export default function Modal({
  openBtnText,
  heading,
  handleClose,
  children
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const formId = useId();

  useEffect(() => {
    const currentRoute = decodeURIComponent(searchParams.get('route') || '');
    if (currentRoute === heading) {
      setIsVisible(true);
      console.log('dialogRef?.current:', dialogRef?.current);
      dialogRef?.current?.showModal?.()
    }
  }, [searchParams, heading]);

  const handleOpenClick = () => {
    setIsVisible(true);
    console.log('heading:', heading);
    searchParams.set('route', encodeURIComponent(heading));
    setSearchParams(searchParams);
    dialogRef?.current?.showModal();
  };

  const _handleClose = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    searchParams.delete('route');
    setSearchParams(searchParams);

    setIsVisible(false);
    handleClose?.(e);
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

    if (clickedOutsideOfModalBox) {
      setIsVisible(false);
      dialogRef?.current?.close();
    }
  }

  return <>
    <button onClick={handleOpenClick}>{openBtnText}</button>
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
