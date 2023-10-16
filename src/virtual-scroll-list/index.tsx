import { useState, useLayoutEffect, useEffect, useCallback, useMemo, ReactNode, useRef } from 'react';

interface virtualProps {
  wrapperStyle: object;
  estimatedItemHeight: number; // 每个元素的高度
  dataList: any[]; // 所有数据
  children: (record: object) => ReactNode;
}
const bufferItemCount = 1; // 缓冲加载列表项个数

function VirtualList(props: virtualProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const virtualBodyRef = useRef<HTMLDivElement>(null);
  const { wrapperStyle, estimatedItemHeight, dataList, children } = props;

  const [screenHeight, setScreenHeight] = useState<number>(0);
  const [visibleList, setVisibleList] = useState<any[]>([]); // 当前可视区上需要渲染的数据
  const [scrollTop, setScrollTop] = useState<number>(0); // 滚动条滚动的距离
  const [offset, setOffset] = useState<number>(0); // 虚拟列表区域应移动的距离
  const [positionCache, setPositionCache] = useState<any[]>([]); // 缓存数据信息

  useLayoutEffect(() => {
    const height = wrapperRef.current?.clientHeight || 0; // 获取可视区content高度
    setScreenHeight(height);
  }, []);

  // 所有元素的实际高度，用于滚动条计算
  const totalHeight = useMemo(() => {
    return positionCache.reduce((total, item) => {
      return total + item.height;
    }, 0);
  }, [positionCache]);

  // 初始缓存列表的高度
  useEffect(() => {
    const positList: any = [];
    dataList.forEach((info, i) => {
      positList[i] = {
        ...info,
        height: estimatedItemHeight,
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
      if (total >= scrollTop) {
        start = Math.max(0, i - bufferItemCount);
        break;
      }
    }
    return start;
  }, [scrollTop, positionCache]);

  // 获取当前可视区上需要渲染数据的结束索引
  const getEndIndex = useCallback(() => {
    let end = 0;
    let total = 0;
    for (let i = 0; i < positionCache.length; i++) {
      total += positionCache[i].height;
      if (total >= scrollTop + screenHeight) {
        end = Math.min(i + bufferItemCount, positionCache.length);
        break;
      }
    }
    return end;
  }, [positionCache, screenHeight, scrollTop]);

  // 获取当前可视区上需要渲染的数据
  const getVisibleList = useCallback(() => {
    const start = getStartIndex();
    const end = getEndIndex();
    // console.log('positionCache==>', positionCache)
    setVisibleList(positionCache.slice(start, end)); // 获取当前可视区上需要渲染的数据

    // 计算虚拟列表的位移
    const offset = positionCache.reduce((total, item, index) => {
      if (index < start) {
        return total + item.height;
      }
      return total;
    }, 0);
    // console.log('offset->', offset, 'start->', start, 'end->', end)
    setOffset(offset);
  }, [positionCache, screenHeight, estimatedItemHeight, scrollTop]);
  useEffect(() => {
    getVisibleList();
  }, [getVisibleList]);

  function onScroll(e: any) {
    const { scrollTop } = e.target;
    if (scrollTop + screenHeight <= totalHeight) {
      // 防止滚动条滚动超出最大高度时，页面不停闪动
      setScrollTop(scrollTop);
    }
  }

  useEffect(() => {
    // 获取可视区元素的实际高度，更新缓存列表
    const wrapperRef = virtualBodyRef.current;
    if (wrapperRef) {
      const nodes = wrapperRef.children;
      // console.log('==>', nodes)
      const positList: any[] = [...positionCache];
      let needUpdateCache = false; // 是否需要更新缓存
      for (const item of Array.from(nodes)) {
        const { offsetHeight, id } = item as HTMLElement;
        const curIndex: number = Number(id.split('-')[1]); // 获取当前元素的索引
        // 如果当前元素的高度发生变化，则更新缓存
        if (positList[curIndex].height !== offsetHeight) {
          needUpdateCache = true;
          positList[curIndex].height = offsetHeight; // 更新当前元素的实际高度
        }

        nodeAddObserve(curIndex, offsetHeight);
      }
      if (needUpdateCache) {
        setPositionCache(positList);
      }
    }
  }, [scrollTop]);

  // 对当前元素添加监听
  function nodeAddObserve(index: number, oldheight) {
    let needUpdateCache = false; // 是否需要更新缓存
    const positList: any[] = [...positionCache];
    const node: any = document.querySelector('#row-' + index);

    if (!node.myObserver) {
      node.myObserver = new MutationObserver(function () {
        const newheight = node.getBoundingClientRect().height;
        // console.log('==>', newheight, oldheight);
        if (newheight !== oldheight) {
          needUpdateCache = true;
          positList[index].height = newheight; // 更新当前元素的实际高度
        }
      });
      node.myObserver.observe(node, {
        // attributes: true, // 监听标签属性变化
        subtree: true, // 监听后代节点变化
        childList: true, // 监听子节点变化
      });
    }
    if (needUpdateCache) {
      setPositionCache(positList);
    }
  }

  // 列表动态变化时，更新缓存
  function onChangeItem(index, type) {
    const list = [...positionCache];
    if (type === 'open') {
      list[index].showAll = true;
    } else {
      list[index].showAll = false;
    }
    setPositionCache(list);
  }

  return (
    <div className='screen' id='virtua-scroll-wrapper' ref={wrapperRef} onScroll={onScroll} style={wrapperStyle}>
      <div className='inner-box' style={{ height: `${totalHeight}px` }}>
        <div className='virtulal-box' ref={virtualBodyRef} style={{ transform: `translateY(${offset}px)` }}>
          {visibleList.map((item: any) => (
            <div key={item.index} id={'row-' + item.index}>
              {children({
                record: item,
                onChangeItem,
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default VirtualList;
