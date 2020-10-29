import React, { useRef, useEffect } from 'react';
import UISvg from '@static/svgs/AboutMe2.svg';
import gsap, { Power2 } from 'gsap';

interface Props {
  className?: string;
}

export const UISvgAnimation = ({ className }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const anim = useRef<any>(null);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }
    const svg: any = wrapperRef?.current?.children[0];

    const phone = svg.getElementById('phone');
    const frame = svg.querySelector('#frame path');
    const logo = svg.getElementById('logo');
    const popup = svg.getElementById('popup');
    const card1 = svg.getElementById('card_1');
    const card2 = svg.getElementById('card_2');
    const plant1 = svg.getElementById('plant_1');
    const plant2 = svg.getElementById('plant_2');

    gsap.set([phone, logo, popup, card1, card2], { autoAlpha: 0 });
    gsap.set([plant1, plant2], { scale: 1 });
    gsap.set([frame], {
      strokeWidth: 7,
      strokeDasharray: frame.getTotalLength(),
    });

    const tl = gsap.timeline({
      defaults: { ease: Power2.easeInOut },
      scrollTrigger: {
        id: 'ui-anim',
        trigger: wrapperRef.current,
        start: 'top center+=100',
        toggleActions: 'play none none reverse',
      },
    });

    anim.current = tl
      .fromTo(phone, { x: '-=300' }, { x: '+=300', duration: 1, autoAlpha: 1 })
      .fromTo(
        frame,
        { strokeDashoffset: frame.getTotalLength() },
        {
          duration: 1,
          ease: Power2.easeOut,
          strokeDashoffset: 300,
          autoAlpha: 0.3,
        },
      )
      .fromTo(logo, { y: '-=300' }, { y: 0, autoAlpha: 1 })
      .fromTo(card1, { x: '-=300' }, { x: 0, autoAlpha: 1 }, 1.3)
      .fromTo(card2, { x: '+=300' }, { x: 0, autoAlpha: 1 }, 1.3)
      .fromTo(popup, { y: '+=300' }, { y: 0, autoAlpha: 1 })
      .fromTo(
        plant1,
        { x: -3 },
        { transformOrigin: '50% 50%', x: 3, scale: 1, yoyo: true, repeat: -1 },
        0.5,
      )
      .fromTo(
        plant2,
        { x: 3 },
        { transformOrigin: '50% 50%', x: -3, scale: 1, yoyo: true, repeat: -1 },
        0.5,
      );
  }, []);

  return (
    <div className={className} ref={wrapperRef} id="ui-anim">
      <UISvg />
    </div>
  );
};
