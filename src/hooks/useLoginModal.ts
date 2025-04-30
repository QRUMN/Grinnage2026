import { atom, useAtom } from 'jotai';

const loginModalAtom = atom(false);

export const useLoginModal = () => {
  const [isOpen, setIsOpen] = useAtom(loginModalAtom);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal
  };
};