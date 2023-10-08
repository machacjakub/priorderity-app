interface IProps {
	onClose: () => void;
	isOpen: boolean;
	children: any;
	tailwind?: string;
}

export const ModalWindow = ({
	onClose,
	isOpen,
	children,
	tailwind,
}: IProps) => {
	return (
		<>
			{isOpen && (
				<div
					onClick={onClose}
					className={`fixed z-40 h-screen w-screen ${tailwind}`}
				>
					<div
						onClick={(e) =>
							e.stopPropagation()
						}
					>
						{children}
					</div>
				</div>
			)}
		</>
	);
};
