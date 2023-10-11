import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { getDataList } from './data';
import { VirtualScrollList } from '../src/index';
// import {VirtualScrollList} from '../dist/umd/index';
// import { VirtualScrollList } from 'virtual-scroll-list_ferying/dist';
import './index.scss';

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
    <div className='wrapper'>
      <h1>虚拟滚动列表</h1>
      <h2 style={{ marginTop: 20 }}>列表元素高度是动态的虚拟列表</h2>
      <VirtualScrollList
        wrapperStyle={{ width: '300px', height: '400px' }}
        estimatedItemHeight={40}
        dataList={dataList}
      >
        {(props: any) => {
          const { record, onChangeItem } = props;

          return (
            <div className='row-item'>
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>index_{record.index}</h3>
                {record.content.length > 5 && (
                  <>
                    {record.showAll ? (
                      <button onClick={() => onChangeItem(record.index, 'close')}>收起</button>
                    ) : (
                      <button onClick={() => onChangeItem(record.index, 'open')}>查看全部</button>
                    )}
                  </>
                )}
              </header>
              {record.showAll
                ? record.content.map((item: string, i: number) => <div key={i}>{item}</div>)
                : record.content.slice(0, 5).map((item, i) => <div key={i}>{item}</div>)}
            </div>
          );
        }}
      </VirtualScrollList>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<DemoPage />);
