import styled from "styled-components";

const Window = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
    z-index: 10; 
	background-color: lavender;
`;

interface IProps {
    onClose: () => void;
    isOpen: boolean
    children: any;
	tailwind?: string;
}

export const ModalWindow = ( {onClose, isOpen, children, tailwind}: IProps ) => {
	return (
		<>
			{isOpen &&
				<div onClick={onClose} className={`fixed w-screen h-screen z-40 ${tailwind}`} >
					<div onClick={( e ) => e.stopPropagation()}>
						{children}
					</div>
				</div>
			}
		</>
	);
};