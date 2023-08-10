import { useState, useEffect, useCallback, useMemo, ReactNode } from "react";

interface virtualProps {
  screenWidth: number; // 可视区宽度
  screenHeight: number; // 可视区高度
  itemHeight: number; // 每个元素的高度
  dataList: any[]; // 所有数据
  children: (record: object) => ReactNode; 
}

function VirtualList(props: virtualProps) {
  const { screenWidth, screenHeight, itemHeight, dataList, children } = props;
  const totalHeight = dataList.length * itemHeight; // 所有元素的实际高度，用于滚动条计算

  const [visibleList, setVisibleList] = useState<any[]>([]); // 当前可视区上需要渲染的数据
  const [scrollTop, setScrollTop] = useState<number>(0); // 滚动条滚动的距离
  const [offset, setOffset] = useState<number>(0); // 列表区域应移动的距离

  const countVisibleList = useCallback(() => {
    const screenCount = Math.ceil(screenHeight / itemHeight); // 可视区上能显示的元素个数
    const start = Math.floor(scrollTop / itemHeight); // 当前可视区上第一个需要渲染元素的索引
    const end = start + screenCount + 1; // 当前可视区上最后一个需要渲染元素的索引
    setVisibleList(dataList.slice(start, end));

    const offset = start * itemHeight; // 计算列表区域应移动的距离
    setOffset(offset);
  }, [dataList, screenHeight, itemHeight, scrollTop]);
  useEffect(() => {
    countVisibleList();
  }, [countVisibleList]);

  function onScroll(e: any) {
    const { scrollTop } = e.target;
    setScrollTop(scrollTop);
  }

  return (
    <div
      className="screen"
      onScroll={onScroll}
      style={{ height: `${screenHeight}px`, width: `${screenWidth}px` }}
    >
      <div className="inner-box" style={{ height: `${totalHeight}px` }}>
        <div
          className="show-box"
          style={{ transform: `translateY(${offset}px)` }}
        >
          {visibleList.map((item: any) => children(item))}
        </div>
      </div>
    </div>
  );
}
export default VirtualList;
