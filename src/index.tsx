import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { getDataList } from "./data";
import VirtualList from "./virtual-scroll-list";
import "./index.scss";

function DemoPage() {
  const [dataList, setDataList] = useState<any[]>([]); // 所有数据

  async function getList() {
    const res: any[] = await getDataList();
    setDataList(res);
  }
  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="wrapper">
      <h1>虚拟滚动列表</h1>

      <h2>列表元素高度固定的虚拟列表</h2>
      {/* <VirtualList
        screenWidth={300}
        screenHeight={400}
        itemHeight={40} // 这里是列表元素的高度
        dataList={dataList}
      >
        {(record:any) => (
            <div
                className="row-item"
                key={record.id}
                style={{ height: `40px` }} // 这里的高度必须是固定的
            >
                {record.name}
            </div>
        )}
      </VirtualList> */}

      <h2 style={{ marginTop: 20 }}>列表元素高度不固定的虚拟列表</h2>
      <VirtualList
        screenWidth={300}
        screenHeight={400}
        itemHeight={40} //estimatedItemHeight={40}
        dataList={dataList}
      >
        {(record: any) => (
          <div className="row-item">
            index_{record.index}
            {Array.from({ length: Math.ceil(Math.random() * 10) }, (x, i) => (
              <div key={i}>这里是测试内容_{i}</div>
            ))}
          </div>
        )}
      </VirtualList>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<DemoPage />);
