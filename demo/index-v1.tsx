import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import "./index.scss";
import { getDataList } from "./data";

const itemHeight = 40; // 每个元素的高度
const screenHeight = 400; // 可视区高度
const screenCount = Math.ceil(screenHeight / itemHeight); // 可视区上能显示的元素个数

function VirtualList() {
  const [dataList, setDataList] = useState<any[]>([]); // 所有数据
  const [curList, setCurList] = useState<any[]>([]); // 当前可视区上需要渲染的数据
  const [totalHeight, setTotalHeight] = useState<number>(0); // 所有元素的实际高度，用于滚动条计算
  const [offset, setOffset] = useState<number>(0); // 滚动条滚动的距离

  async function getList() {
    const res: any[] = await getDataList();
    const height = res.length * itemHeight; // 所有元素的实际高度，用于滚动条计算
    setTotalHeight(height);
    setCurList(res.slice(0, screenCount + 1));
    setDataList(res);
  }
  useEffect(() => {
    getList();
  }, []);

  function onScroll(e: any) {
    const { scrollTop } = e.target;
    const start = Math.floor(scrollTop / itemHeight); // 当前可视区上第一个需要渲染元素的索引
    const end = start + screenCount + 1; // 当前可视区上最后一个需要渲染元素的索引
  
    setCurList(dataList.slice(start, end));
    const offset = start * itemHeight; // 计算列表区域应移动的距离
    setOffset(offset);
  }

  return (
    <div className="wrapper">
      <h1>虚拟滚动列表</h1>
      <div
        className="screen"
        onScroll={onScroll}
        style={{ height: `${screenHeight}px` }}
      >
        <div className="inner-box" style={{ height: `${totalHeight}px` }}>
          <div
            className="show-box"
            style={{ transform: `translateY(${offset}px)` }}
          >
            {curList.map((item) => {
              return (
                <div
                  className="row-item"
                  key={item.id}
                  style={{ height: `${itemHeight}px` }}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<VirtualList />);