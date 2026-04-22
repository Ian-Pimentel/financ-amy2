import { useEffect, useRef } from "react";
import { useIntersectionObserver, useResizeObserver, type UseIntersectionObserverOptions, } from "usehooks-ts";

type Props = {
    rightElement?: React.ReactNode;
    leftElement?: React.ReactNode;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
} & React.PropsWithChildren

export default function SwipeWrapper({ rightElement, leftElement, onSwipeLeft, onSwipeRight, children }: Props) {
    if (!rightElement && !leftElement) throw Error('At least one Swipe Element must be defined.');

    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const shouldHoldLeft = onSwipeLeft === undefined;
    const shouldHoldRight = onSwipeRight === undefined;

    const isLeftVisible = useRef(false);
    const isRightVisible = useRef(false);

    const scrollToContent = (behavior?: ScrollBehavior) => {
        contentRef.current?.scrollIntoView({ behavior: behavior || "smooth" });
    }

    const handleScrollEnd = () => {
        const shouldSwipeLeft = !shouldHoldLeft && isLeftVisible.current;
        const shouldSwipeRight = !shouldHoldRight && isRightVisible.current;

        if (shouldSwipeLeft || shouldSwipeRight) {
            isLeftVisible.current = false;
            isRightVisible.current = false;

            if (shouldSwipeLeft && onSwipeLeft) onSwipeLeft();
            if (shouldSwipeRight && onSwipeRight) onSwipeRight();
            scrollToContent();
        }
    }

    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return;

        // que gambiarra ein, tive q apelar pra IA :(
        // o modal está na DOM, mas está escondido, width 0.
        // ent ScrollIntoView não funciona, resize observa quando o elemento tiver qualquer tamanho
        // e ai faz scroll
        let prevWidth = 0;
        const observer = new ResizeObserver((entries) => {
            const { width } = entries[0]!.contentRect;

            if (prevWidth === 0 && width > 0) {
                scrollToContent("instant");
            }

            prevWidth = width;
        });

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            onScrollEnd={handleScrollEnd}
            className="
                @container flex 
                overflow-y-hidden
                overflow-x-scroll scroll-smooth snap-x snap-proximity overscroll-none! no-scrollbar
                *:snap-always
                *:first:snap-start *:last:snap-end
                *:first:tab-index
            "
        >
            {shouldHoldLeft ?
                <div className="flex-0 basis-[fit-content]" tabIndex={-1}>{leftElement}</div> :
                <SwipeAction onVisibilityChange={(visible) => { isLeftVisible.current = visible }} options={{ threshold: 1 }}>
                    {leftElement}
                </SwipeAction>
            }

            <div ref={contentRef} onClick={() => scrollToContent()} className="flex-[0_0_100cqw] snap-center">{children}</div>

            {shouldHoldRight ?
                <div className="flex-0 basis-[fit-content]" tabIndex={-1}>{rightElement}</div> :
                <SwipeAction onVisibilityChange={(visible) => { isRightVisible.current = visible }} options={{ threshold: 1 }}>
                    {rightElement}
                </SwipeAction>
            }
        </div>
    );
}

type SwipeActionProps = {
    onVisibilityChange: (isVisible: boolean) => void;
    options?: UseIntersectionObserverOptions;
} & React.PropsWithChildren;

export function SwipeAction({ onVisibilityChange, children, options }: SwipeActionProps) {
    const { ref, isIntersecting } = useIntersectionObserver(options);

    useEffect(() => {
        onVisibilityChange(isIntersecting);
    }, [isIntersecting, onVisibilityChange]);

    return <div ref={ref} className="flex-[0_0_fit-content]">{children}</div>
}

export function SwipeDelete({ onDelete }: { onDelete?: () => void }) {
    return (
        <div onClick={onDelete} className="bg-red-600 h-full w-32 flex items-center justify-center">🗑️</div>
    );
}