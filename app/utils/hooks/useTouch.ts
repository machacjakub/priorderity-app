import { useRef } from "react";

interface IOptions {
    onHold?: ()=> void
    onDoubleTap?: () => void
    onTap?: () => void
}

export const useTouch = ( { onHold, onTap, onDoubleTap }: IOptions ) => {
	const longTouchMs = 300;

	const touchTimeoutRef = useRef<any>( null );
	const touchCounterRef = useRef( 0 );
	const holdRef = useRef( false );

	const interval = () => {
		if ( holdRef.current ) {
			onHold && onHold();
		} else if ( touchCounterRef.current === 2 ) {
			onDoubleTap && onDoubleTap();
		} else {
			onTap && onTap();
		}
		touchCounterRef.current = 0;
	};

	const onTouchStart = () => {
		holdRef.current = true;
		touchCounterRef.current = touchCounterRef.current + 1;
		clearTimeout( touchTimeoutRef.current );
		touchTimeoutRef.current = setTimeout( interval, longTouchMs );
	};

	const onTouchEnd = () => {
		holdRef.current = false;
	};

	const onTouchMove = () => {
		clearTimeout( touchTimeoutRef.current );
	};

	return { onTouchStart, onTouchEnd, onTouchMove };
};