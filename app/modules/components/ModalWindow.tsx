import styled from "styled-components";

const Window = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
`;

interface IProps {
    onClose: () => void;
    isOpen: boolean
    children: any;
}

export const ModalWindow = ( {onClose, isOpen, children}: IProps ) => {
	return (
		<Window onClick={onClose} style={{display: isOpen ? '' : 'none'}}>
			<div onClick={( e ) => e.stopPropagation()}>
				{children}
			</div>
		</Window>
	);
};