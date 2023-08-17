import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
  useRef,
} from "react";

interface virtualProps {
  screenWidth: number; // 可视区宽度
  screenHeight: number; // 可视区高度
  itemHeight: number; // 每个元素的高度
  dataList: any[]; // 所有数据
  children: (record: object) => ReactNode;
}
const bufferItemCount = 1; // 缓冲加载列表项个数

function VirtualList(props: virtualProps) {
  const virtualBodyRef = useRef<HTMLDivElement>(null);
  const { screenWidth, screenHeight, itemHeight, dataList, children } = props;

  const [visibleList, setVisibleList] = useState<any[]>([]); // 当前可视区上需要渲染的数据
  const [scrollTop, setScrollTop] = useState<number>(0); // 滚动条滚动的距离
  const [offset, setOffset] = useState<number>(0); // 列表区域应移动的距离
  const [positionCache, setPositionCache] = useState<any[]>([]); //缓存位置

  // 所有元素的实际高度，用于滚动条计算
  const totalHeight = useMemo(() => {
    return positionCache.reduce((total, item) => {
      return total + item.height;
    }, 0);
  }, [positionCache]);

  useEffect(() => {
    // 初始缓存列表的高度
    const positList: any = [];
    dataList.forEach((_, i) => {
      positList[i] = {
        index: i,
        height: itemHeight,
      };
    });
    setPositionCache(positList);
  }, [dataList]);

  // 获取当前可视区上需要渲染数据的开始索引
  const getStartIndex = useCallback(() => {
    let start = 0;
    let total = 0; // 当前元素之前所有元素的高度
    for (let i = 0; i < positionCache.length; i++) {
      total += positionCache[i].height;
      if (total > scrollTop) {
        start = Math.max(0, i - 1);
        break;
      }
    }
    return start;
  }, [scrollTop, positionCache]);

  // 获取当前可视区上需要渲染数据的结束索引
  const getEndIndex = useCallback((start: number) => {
      let end = start;
      let total = 0;
      for(let i = start; i < positionCache.length; i++) {
        total += positionCache[i].height;
        if(total > screenHeight) {
            end = i;
            break;
        }
      }
      return end;
    },[positionCache, screenHeight]);

    // 获取当前可视区上需要渲染的数据
  const getVisibleList = useCallback(() => {
    const start = getStartIndex();
    const end = getEndIndex(start);
    setVisibleList(positionCache.slice(start, end));

    // 计算虚拟列表的位移
    const offset = positionCache.reduce((total, item, index) => {
      if (index < start) {
        return total + item.height;
      }
    }, 0);
    setOffset(offset);
  }, [positionCache, screenHeight, itemHeight, scrollTop]);
  useEffect(() => {
    getVisibleList();
  }, [getVisibleList]);


  useEffect(() => {
    const wrapperRef = virtualBodyRef.current;
    if (wrapperRef) {
      const nodes = wrapperRef.children;
      const positList: any[] = [...positionCache];
      let needUpdateCache = false; // 是否需要更新缓存
      for (let item of nodes) {
        const { offsetHeight, id } = item as HTMLElement;
        const curIndex: number = Number(id.split("-")[1]); // 获取当前元素的索引
        // 如果当前元素的高度发生变化，则更新缓存
        if (positList[curIndex].height !== offsetHeight) {
          needUpdateCache = true;
          positList[curIndex].height = offsetHeight;
        }
      }
      if (needUpdateCache) {
        setPositionCache(positList);
      }
    }
  }, [scrollTop, virtualBodyRef]);

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
          className="virtulal-box"
          ref={virtualBodyRef}
          style={{ transform: `translateY(${offset}px)` }}
        >
          {visibleList.map((item: any) => (
            <div key={item.index} id={"row-" + item.index}>
              {children(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default VirtualList;
