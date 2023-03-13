
import { useState, useEffect, useRef } from 'react'
import { animated, useSpring, to } from '@react-spring/web'
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { resetBaseOrientation } from '../assets/js/helpers/orientation';
import { round, clamp, adjust } from '../assets/js/helpers/AdvancedMath';

import '../assets/css/cards/loader.css'

import { CardDynamicStyles, CardInteractPointerEvent, CardInteractTouchEvent, CardProps, CardStaticStyles } from '../types/GameCard';

export default ({ canBeSelected = true, canPop = true, canBeRotated = true, canBeDragged = false, ...props }: CardProps) => {
    // UTILISER LE STORE POUR STOCKER LA CARTE ACTIVE !!!
    const [activeCard, setActiveCard] = useState<React.MutableRefObject<HTMLDivElement | undefined>>();
    // PAREIL POUR LE SHOWCASE
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
    const frontImg = props.image_large;

    const thisCard = useRef<HTMLDivElement>();

    const [componentIsLoaded, setComponentIsLoaded] = useState(false);

    const [repositionTimer, setRepositionTimer] = useState<number>();
    const [active, setActive] = useState(false);
    const [interacting, setInteracting] = useState(false);
    const [firstPop, setFirstPop] = useState(true);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(document.visibilityState === "visible");

    const [showcaseInterval, setShowcaseInterval] = useState<number>();
    const [showcaseTimerStart, setShowcaseTimerStart] = useState<number>();
    const [showcaseTimerEnd, setShowcaseTimerEnd] = useState<number>();
    const [showcaseRunning, setShowcaseRunning] = useState(showcase);

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

    const interact = (e: CardInteractPointerEvent<HTMLDivElement> | CardInteractTouchEvent<HTMLDivElement>) => {
        endShowcase();

        if (!isVisible) {
            return setInteracting(false);
        }

        // prevent other background cards being interacted with
        if (activeCard?.current && activeCard.current !== thisCard.current) {
            return setInteracting(false);
        }

        setInteracting(true);

        if (e instanceof TouchEvent) {
            e.clientX = e.touches[0].clientX;
            e.clientY = e.touches[0].clientY;
        }

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

    const interactEnd = (e: React.MouseEvent<HTMLDivElement> | null = null, delay = 500) => {
        setTimeout(function () {
            const snapStiff = 0.01;
            const snapDamp = 0.06;
            setInteracting(false);

            setSpringRotate({ x: 0, y: 0, stiffness: snapStiff, damping: snapDamp });
            setSpringGlare({ x: 50, y: 50, o: 0, stiffness: snapStiff, damping: snapDamp });
            setSpringBackground({ x: 50, y: 50, stiffness: snapStiff, damping: snapDamp });

        }, delay);
    };

    const activate = (e: React.MouseEvent<HTMLDivElement>) => {
        if (activeCard?.current && activeCard.current === thisCard.current) {
            setActiveCard(undefined);
        } else {
            setActiveCard(thisCard);
            resetBaseOrientation();
        }
    }

    const deactivate = (e: React.FocusEvent<HTMLDivElement>) => {
        interactEnd();
        setActiveCard(undefined);
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
        if (!thisCard.current) return;
        const rect = thisCard.current.getBoundingClientRect(); // get element's size/position
        const view = document.documentElement; // get window/viewport size

        const delta = {
            x: round(view.clientWidth / 2 - rect.x - rect.width / 2),
            y: round(view.clientHeight / 2 - rect.y - rect.height / 2),
        };
        setSpringTranslate({ x: delta.x, y: delta.y });
    };

    const popover = () => {
        if (!thisCard.current) return;
        const rect = thisCard.current.getBoundingClientRect(); // get element's size/position
        let delay = 100;
        let scaleW = (window.innerWidth / rect.width) * 0.9;
        let scaleH = (window.innerHeight / rect.height) * 0.9;
        let scaleF = 1.75;
        setCenter();
        if (firstPop) {
            delay = 1000;
            setSpringRotateDelta({ x: 360, y: 0 });
        }
        setFirstPop(false);
        setSpringScale({ s: Math.min(scaleW, scaleH, scaleF) });
        interactEnd(null, delay);
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

    // const orientate = (e) => {
    //     const x = e.relative.gamma;
    //     const y = e.relative.beta;
    //     const limit = { x: 16, y: 18 };

    //     const degrees = {
    //         x: clamp(x, -limit.x, limit.x),
    //         y: clamp(y, -limit.y, limit.y)
    //     };

    //     updateSprings({
    //         x: adjust(degrees.x, -limit.x, limit.x, 37, 63),
    //         y: adjust(degrees.y, -limit.y, limit.y, 33, 67),
    //     }, {
    //         x: round(degrees.x * -1),
    //         y: round(degrees.y),
    //     }, {
    //         x: adjust(degrees.x, -limit.x, limit.x, 0, 100),
    //         y: adjust(degrees.y, -limit.y, limit.y, 0, 100),
    //         o: 1,
    //     });
    // };

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
        reset();
    });

    useEffect(() => {
        if (activeCard?.current && activeCard.current === thisCard.current) {
            popover();
            setActive(true);
        } else {
            retreat();
            setActive(false);
        }
    }, [activeCard]);

    // useEffect(() => {
    //     if (activeCard?.current && activeCard.current === thisCard.current) {
    //         setInteracting(true);
    //         orientate(orientation);
    //     }
    // }, [activeCard]);

    useEffect(() => {
        if (componentIsLoaded) return;
        setComponentIsLoaded(true);
        // set the front image on mount so that
        // the lazyloading can work correctly
        // img = props.images.large
        // img = imgBase + frontImg;

        // run a cute little animation on load
        // for showcase card
        if (showcase && isVisible) {
            const s = 0.02;
            const d = 0.5;
            let r = 0;
            const scts = setTimeout(() => {
                setInteracting(true);
                setActive(true);
                setSpringRotate({ stiffness: s, damping: d });
                setSpringGlare({ stiffness: s, damping: d });
                setSpringBackground({ stiffness: s, damping: d });
                if (isVisible) {
                    const sci = setInterval(function () {
                        r += 0.05;
                        setSpringRotate({ x: Math.sin(r) * 25, y: Math.cos(r) * 25 });
                        setSpringGlare({
                            x: 55 + Math.sin(r) * 55,
                            y: 55 + Math.cos(r) * 55,
                            o: 0.8,
                        });
                        setSpringBackground({
                            x: 20 + Math.sin(r) * 20,
                            y: 20 + Math.cos(r) * 20,
                        });
                    }, 20);
                    setShowcaseInterval(sci);

                    const scte = setTimeout(() => {
                        clearInterval(showcaseInterval);
                        interactEnd(null, 0);
                    }, 4000);
                    setShowcaseTimerEnd(scte);
                } else {
                    setInteracting(false);
                    setActive(false);
                    return;
                }
            }, 2000);
            setShowcaseTimerStart(scts);
        }
    }, [componentIsLoaded]);

    return (
        <Draggable key={props.id.toString()} draggableId={props.id.toString()} index={props.uniqueId} isDragDisabled={!canBeDragged}>
            {provider => (
                <div ref={provider.innerRef} card-provider={1} {...provider.draggableProps}>
                    <animated.div
                        className={`card ${props.attribute ? props.attribute.replace(/\W/g, '-').toLowerCase() : ''} / interactive /${active ? ' active' : ''}${interacting ? ' interacting' : ''}${loading ? ' loading' : ''}`}
                        data-number={props.id}
                        data-set={props.setCode}
                        data-type={props.type.replace(/\W/g, '-').toLowerCase()}
                        data-frametype={props.frameType.replace(/\W/g, '-').toLowerCase()}
                        data-archetype={props.archetype ? props.archetype.replace(/\W/g, '-').toLowerCase() : ''}
                        data-rarity={props.rarity.replace(/\W/g, '-').toLowerCase()}
                        style={dynamicStyles}
                        ref={thisCard}>
                        <div className="card__translater">
                            <div className="card__rotator" tabIndex={0} onClick={activate} onBlur={deactivate} onPointerMove={interact} onMouseOut={interactEnd} {...provider.dragHandleProps}>
                                <img className="card__back" src={backImg} loading="lazy" width="660" height="921" />
                                <div className="card__front" style={staticStyles}>
                                    <img src={frontImg} onLoad={() => setLoading(false)} loading="lazy" width="660" height="921" />
                                    <div className="card__shine"></div>
                                    <div className="card__glare"></div>
                                </div>
                            </div>
                        </div>
                    </animated.div>
                </div>
            )}
        </Draggable>
    )
}
