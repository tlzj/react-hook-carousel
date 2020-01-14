import React, { useRef, useEffect, useCallback, useState } from 'react';
import './index.less';
const IconFont = Loader.loadBaseComponent('IconFont');

const CarouselComponent = props => {
  const { width = 180, marginNum = 0, length = 0, children, type } = props;
  const boxWidth = width * length + marginNum * (length - 1); // 外层盒子的总宽
  const carouselRef = useRef(); // 滚动盒子的ref
  const carouselOutBoxRef = useRef(); // 最外层包裹盒子的ref
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (carouselRef.current) {
      setIndex(0);
      carouselRef.current.style.transition = 'none';
      carouselRef.current.style.width = boxWidth + 'px';
      let timer = setTimeout(() => {
        carouselRef.current.style.transition = 'all .5s';
      }, 0)
      return () => {
        clearTimeout(timer);
      }
    }
  }, [width, length, marginNum, type]);

  const prevClick = useCallback(() => {
    if (index === 0) {
      return;
    }
    setIndex(index - 1);
  }, [index]);

  const nextClick = useCallback(() => {
    if ((length - index) * (width + marginNum) - marginNum <= carouselOutBoxRef.current.offsetWidth) {
      return;
    }
    setIndex(index + 1);
  }, [index, width, marginNum, length]);
  return (
    <div className="carousel-component-tl" ref={carouselOutBoxRef}>
      <div className="left-btn btn" onClick={prevClick}>
        <IconFont type="icon-S_Arrow_SmallLeft" />
      </div>
      <div className="right-btn btn" onClick={nextClick}>
        <IconFont type="icon-S_Arrow_SmallRight" />
      </div>
      <div className="item-box-out" ref={carouselRef} style={{ transform: `translateX(${-index * (width + marginNum)}px)` }}>
        {children}
      </div>
    </div>
  );
};
export default CarouselComponent;
