export const handleBackdropClick = (modal) => (e) => {
  if (!e.target.matches('dialog')) return;
  const { top, bottom, left, right } = e.target.getBoundingClientRect();
  const { clientX: mouseX, clientY: mouseY } = e;

  if (mouseX === 0 && mouseY === 0) return; // https://github.com/facebook/react/issues/7407

  const clickedOutsideOfModalBox = (
    mouseX <= left || mouseX >= right ||
    mouseY <= top || mouseY >= bottom
  );

  if (clickedOutsideOfModalBox) modal.close();
}
