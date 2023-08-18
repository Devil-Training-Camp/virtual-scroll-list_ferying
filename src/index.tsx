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
      <h2 style={{ marginTop: 20 }}>列表元素高度不固定的虚拟列表</h2>
      <VirtualList
        wrapperStyle={{width: '300px', height: '400px'}}
        estimatedItemHeight={40}
        dataList={dataList}
      >
        {(record: any) => (
          <div className="row-item">
            index_{record.index}
            {record.content.map((item, i) => (
                <div key={i}>{item}</div>
            ))}
          </div>
        )}
      </VirtualList>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<DemoPage />);
