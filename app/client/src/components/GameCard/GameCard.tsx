
import React from 'react';
import { animated, useSpring, to } from '@react-spring/web';
import { round, clamp, adjust } from '@/helpers/utils/AdvancedMath';
import { CardDynamicStyles, CardInteractPointerEvent, CardInteractTouchEvent, CardStaticStyles } from '.';
import GameCardContext from '@/helpers/context/cards/GameCardContext';
import GameCardInfos from '@/components/GameCard/GameCardInfos';

import '@/assets/css/cards/loader.css'
import { IGameCard } from '@/helpers/types/cards';

const GameCard = (props: IGameCard) => {
    // CONTEXTE POUR showcase
    const showcase = false;

    const randomSeed = {
        x: Math.random(),
        y: Math.random()
    }

    const cosmosPosition = {
        x: Math.floor(randomSeed.x * 734),
        y: Math.floor(randomSeed.y * 1280)
    };

    const backImg = "https://images.ygoprodeck.com/images/cards/back_high.jpg";

    const thisCardElement = React.useRef<HTMLDivElement>();

    // const [componentIsLoaded, setComponentIsLoaded] = React.useState(false);

    const { cardSets, setIsDraggable, setIsActive, setIsHidden, setCanFlip, setIsLoaded, deactivateAllCardSets } = React.useContext(GameCardContext);
    const currentCardSet = cardSets.find((cardSet) => cardSet.id === props.id) as IGameCard;
    const [frontImg, setFrontImg] = React.useState('');

    const [repositionTimer, setRepositionTimer] = React.useState<number>();
    const [interacting, setInteracting] = React.useState(false);
    const [firstPop, setFirstPop] = React.useState(true);
    // const [loading, setLoading] = React.useState(true);
    const [isVisible, setIsVisible] = React.useState(document.visibilityState === "visible");

    const [showcaseInterval, setShowcaseInterval] = React.useState<number>();
    const [showcaseTimerStart, setShowcaseTimerStart] = React.useState<number>();
    const [showcaseTimerEnd, setShowcaseTimerEnd] = React.useState<number>();
    const [showcaseRunning, setShowcaseRunning] = React.useState(showcase);

    const springInteractSettings = { stiffness: 0.066, damping: 0.25 };
    const springPopoverSettings = { stiffness: 0.033, damping: 0.45 };

    const [springRotate, setSpringRotate] = useSpring(() => ({ x: 0, y: 0, ...springInteractSettings }));
    const [springRotateDelta, setSpringRotateDelta] = useSpring(() => ({ x: 0, y: 0, ...springPopoverSettings }));
    const [springGlare, setSpringGlare] = useSpring(() => ({ x: 50, y: 50, o: 0, ...springInteractSettings }));
    const [springBackground, setSpringBackground] = useSpring(() => ({ x: 50, y: 50, ...springInteractSettings }));
    const [springTranslate, setSpringTranslate] = useSpring(() => ({ x: 0, y: 0, ...springPopoverSettings }));
    const [springScale, setSpringScale] = useSpring(() => ({ s: 1, ...springPopoverSettings }));

    const staticStyles: CardStaticStyles = {
        "--seedx": randomSeed.x,
        "--seedy": randomSeed.y,
        "--cosmosbg": `${cosmosPosition.x}px ${cosmosPosition.y}px;`
    };

    const dynamicStyles: CardDynamicStyles = {
        "--pointer-x": to(springGlare.x, (x) => `${x}%`),
        "--pointer-y": to(springGlare.y, (y) => `${y}%`),
        "--pointer-from-center": to([springGlare.x, springGlare.y], (x, y) => clamp(Math.sqrt(
            (y - 50) * (y - 50) + (x - 50) * (x - 50)
        ) / 50, 0, 1
        )),
        "--pointer-from-top": to(springGlare.y, (y) => y / 100),
        "--pointer-from-left": to(springGlare.x, (x) => x / 100),
        "--card-opacity": springGlare.o,
        "--rotate-x": to([springRotate.x, springRotateDelta.x], (rx, rdx) => `${rx + rdx}deg`),
        "--rotate-y": to([springRotate.y, springRotateDelta.y], (ry, rdy) => `${ry + rdy}deg`),
        "--background-x": to(springBackground.x, (x) => `${x}%`),
        "--background-y": to(springBackground.y, (y) => `${y}%`),
        "--card-scale": springScale.s,
        "--translate-x": to(springTranslate.x, (x) => `${x}px`),
        "--translate-y": to(springTranslate.y, (y) => `${y}px`)
    }

    const endShowcase = () => {
        if (showcaseRunning) {
            clearTimeout(showcaseTimerEnd);
            clearTimeout(showcaseTimerStart);
            clearInterval(showcaseInterval);
            setShowcaseRunning(false);
        }
    };

    const interact = (e: CardInteractPointerEvent<HTMLElement> | CardInteractTouchEvent<HTMLElement>) => {
        endShowcase();

        if (!isVisible || currentCardSet.isHidden) {
            return setInteracting(false);
        }

        // prevent other background cards being interacted with
        // if (!currentCardSet.isFocused) {
        //     return setInteracting(false);
        // }

        setInteracting(true);

        // if (e instanceof TouchEvent) {
        //     e.clientX = e.touches[0].clientX;
        //     e.clientY = e.touches[0].clientY;
        // }

        const el = e.currentTarget as HTMLElement;
        const rect = el.getBoundingClientRect(); // get element's current size/position
        const absolute = {
            x: e.clientX - rect.left, // get mouse position from left
            y: e.clientY - rect.top, // get mouse position from right
        };
        const percent = {
            x: clamp(round((100 / rect.width) * absolute.x)),
            y: clamp(round((100 / rect.height) * absolute.y)),
        };
        const center = {
            x: percent.x - 50,
            y: percent.y - 50,
        };

        updateSprings({
            x: adjust(percent.x, 0, 100, 37, 63),
            y: adjust(percent.y, 0, 100, 33, 67),
        }, {
            x: round(-(center.x / 3.5)),
            y: round(center.y / 2),
        }, {
            x: round(percent.x),
            y: round(percent.y),
            o: 1,
        });
    }

    const interactEnd = (e: React.MouseEvent<HTMLElement> | null = null, delay = 500) => {
        setTimeout(function () {
            const snapStiff = 0.01;
            const snapDamp = 0.06;
            setInteracting(false);

            setSpringRotate({ x: 0, y: 0, stiffness: snapStiff, damping: snapDamp });
            setSpringGlare({ x: 50, y: 50, o: 0, stiffness: snapStiff, damping: snapDamp });
            setSpringBackground({ x: 50, y: 50, stiffness: snapStiff, damping: snapDamp });
        }, delay);
    };

    const activate = (e: React.MouseEvent<HTMLElement>) => {
        if (currentCardSet.isHidden && currentCardSet.canFlip) {
            deactivateAllCardSets();
            setIsHidden(currentCardSet, false);
            setCanFlip(currentCardSet, false);
        } else if (currentCardSet.isActive) {
            setIsDraggable(currentCardSet, true);
            setIsActive(currentCardSet, false);
        } else {
            setIsDraggable(currentCardSet, false);
            deactivateAllCardSets();
            setIsActive(currentCardSet, true);
        }
    }

    const deactivate = (e: React.FocusEvent<HTMLDivElement>) => {
        setIsDraggable(currentCardSet, true);
        setIsActive(currentCardSet, false);
        interactEnd();
    }

    // const reposition = (e) => {
    //     clearTimeout(repositionTimer);
    //     const rt = setTimeout(() => {
    //         if (activeCard?.current && activeCard.current === thisCard.current) {
    //             setCenter();
    //         }
    //     }, 300);
    //     setRepositionTimer(rt);
    // };

    const setCenter = () => {
        if (!thisCardElement.current) return;
        const rect = thisCardElement.current.getBoundingClientRect(); // get element's size/position
        const view = document.documentElement; // get window/viewport size

        let deltaX = currentCardSet.displayCardInfoOnPop ? round(view.clientWidth / 2 - rect.x - (rect.width + rect.width * currentCardSet.popScale * 0.25 + rect.width * currentCardSet.popScale * 2) / 2) : round(view.clientWidth / 2 - rect.x - rect.width / 2);

        const delta = {
            x: deltaX,
            y: round(view.clientHeight / 2 - rect.y - rect.height / 2),
        };
        setSpringTranslate({ x: delta.x, y: delta.y });
    };

    const popover = () => {
        if (!thisCardElement.current) return;
        const rect = thisCardElement.current.getBoundingClientRect(); // get element's size/position
        let delay = 100;
        let scaleW = (window.innerWidth / rect.width) * 0.9;
        let scaleH = (window.innerHeight / rect.height) * 0.9;
        let scaleF = currentCardSet.popScale;
        setCenter();
        if (firstPop) {
            delay = 1000;
            setSpringRotateDelta({ x: 360, y: 0 });
        }
        setFirstPop(false);
        setSpringScale({ s: Math.min(scaleW, scaleH, scaleF) });
        interactEnd(null, delay);
    };

    const hide = () => {
        setSpringScale({ s: 1 });
        setSpringTranslate({ x: 0, y: 0 });
        setSpringRotateDelta({ x: 180, y: 0 });
    };

    const retreat = () => {
        setSpringScale({ s: 1 });
        setSpringTranslate({ x: 0, y: 0 });
        setSpringRotateDelta({ x: 0, y: 0 });
        interactEnd(null, 100);
    };

    const reset = () => {
        interactEnd(null, 0);
        setSpringScale({ s: 1 });
        setSpringTranslate({ x: 0, y: 0 });
        setSpringRotateDelta({ x: 0, y: 0 });
        setSpringRotate({ x: 0, y: 0 });
    };

    const updateSprings = (background: { x: number, y: number }, rotate: { x: number, y: number }, glare: { x: number, y: number, o: number }) => {
        setSpringBackground({
            ...background,
            ...springInteractSettings
        });
        setSpringRotate({
            ...rotate,
            ...springInteractSettings
        });
        setSpringGlare({
            ...glare,
            ...springInteractSettings
        });
    }

    document.addEventListener("visibilitychange", (e) => {
        setIsVisible(document.visibilityState === "visible");
        endShowcase();
        // reset();
    });

    React.useEffect(() => {
        if (currentCardSet.canPop && !currentCardSet.isHidden) {
            if (currentCardSet.isActive) {
                popover();
                // setIsActive(currentCardSet, true);
            } else {
                retreat();
                // setIsActive(currentCardSet, false);
            }
        }
    }, [currentCardSet.canPop, currentCardSet.isActive, currentCardSet.isHidden]);

    React.useEffect(() => {
        if (currentCardSet.isHidden) {
            setIsDraggable(currentCardSet, false);
            hide();
        } else {
            setIsDraggable(currentCardSet, true);
            reset();
        }
    }, [currentCardSet.isHidden]);

    // React.useEffect(() => {
    //     if (componentIsLoaded) return;
    //     setComponentIsLoaded(true);
    //     // set the front image on mount so that
    //     // the lazyloading can work correctly
    //     // img = props.images.large
    //     // img = imgBase + frontImg;

    //     // run a cute little animation on load
    //     // for showcase card
    //     if (showcase && isVisible) {
    //         const s = 0.02;
    //         const d = 0.5;
    //         let r = 0;
    //         const scts = setTimeout(() => {
    //             setInteracting(true);
    //             // setActive(true);
    //             setSpringRotate({ stiffness: s, damping: d });
    //             setSpringGlare({ stiffness: s, damping: d });
    //             setSpringBackground({ stiffness: s, damping: d });
    //             if (isVisible) {
    //                 const sci = setInterval(function () {
    //                     r += 0.05;
    //                     setSpringRotate({ x: Math.sin(r) * 25, y: Math.cos(r) * 25 });
    //                     setSpringGlare({
    //                         x: 55 + Math.sin(r) * 55,
    //                         y: 55 + Math.cos(r) * 55,
    //                         o: 0.8,
    //                     });
    //                     setSpringBackground({
    //                         x: 20 + Math.sin(r) * 20,
    //                         y: 20 + Math.cos(r) * 20,
    //                     });
    //                 }, 20);
    //                 setShowcaseInterval(sci);

    //                 const scte = setTimeout(() => {
    //                     clearInterval(showcaseInterval);
    //                     interactEnd(null, 0);
    //                 }, 4000);
    //                 setShowcaseTimerEnd(scte);
    //             } else {
    //                 setInteracting(false);
    //                 // setActive(false);
    //                 return;
    //             }
    //         }, 2000);
    //         setShowcaseTimerStart(scts);
    //     }
    // }, [componentIsLoaded]);

    React.useEffect(() => {
        if (currentCardSet.isLoaded) return;
        // set the front image on mount so that
        // the lazyloading can work correctly
        setFrontImg(`${currentCardSet.card.imageUrl}?k=${Date.now()}`);
    }, [currentCardSet.isLoaded]);

    return (
        <animated.div
            className={`yugi-card ${props.card.attribute ? `yugi-${props.card.attribute.name.replace(/\W/g, '-').toLowerCase()}` : ''} / yugi-interactive /${currentCardSet.isHidden ? ' yugi-hidden' : ''}${currentCardSet.isActive ? ' yugi-active' : ''}${interacting ? ' yugi-interacting' : ''}${!currentCardSet.isLoaded ? ' yugi-loading' : ''}`}
            data-number={props.id}
            data-set={props.set.code}
            data-type={props.card.type.name.replace(/\W/g, '-').toLowerCase()}
            data-frametype={props.card.frameType.name.replace(/\W/g, '-').toLowerCase()}
            data-archetype={props.card.archetype ? props.card.archetype.name.replace(/\W/g, '-').toLowerCase() : ''}
            data-rarity={props.rarity.name.replace(/\W/g, '-').toLowerCase()}
            style={dynamicStyles}
            ref={thisCardElement as React.RefObject<HTMLDivElement>}>
            <div className="yugi-card__translater">
                <div className="yugi-card__rotator" tabIndex={0} onClick={activate} onPointerMove={interact} onMouseOut={interactEnd} {...props.dragProvided?.dragHandleProps}>
                    <img className="yugi-card__back" src={backImg} loading="lazy" width="660" height="921" />
                    <div className="yugi-card__front" style={staticStyles}>
                        <img src={frontImg} onLoad={() => setIsLoaded(currentCardSet, true)} loading="lazy" width="660" height="921" />
                        <div className="yugi-card__shine"></div>
                        <div className="yugi-card__glare"></div>
                    </div>
                </div>
                {currentCardSet.canPop && !currentCardSet.isHidden && currentCardSet.isActive && currentCardSet.displayCardInfoOnPop && (
                    <GameCardInfos {...props} />
                )}
            </div>
        </animated.div>
    )
}

export default GameCard;
