# virtual-scroll-list_ferying

虚拟滚动列表（react版本）

### 插件功能说明：

可满足列表元素固定、不固定、动态等情况的虚拟滚动列表

### 开发环境说明：

node: v16.13.2
react: v18.2

### 插件使用方式：

```
npm install virtual-scroll-list_ferying --save
```

```
<VirtualScrollList
    wrapperStyle={{ width: '300px', height: '400px' }} // 容器样式
    estimatedItemHeight={40} // 列表元素的高度；如果列表高度不固定，则此值为预估高度值，用作初始化时使用
    dataList={dataList} // 列表数据源
    >
    {(props: any) => {
        // 使用renderProps渲染列表的每项内容
        // record:object 当前列表项的所有信息
        // onChangeItem:function 操作动态高度列表时调用，用来更新缓存的列表信息
        const { record, onChangeItem } = props;

        return (
        <div className='row-item'>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>index_{record.index}</h3>
            // 动态操作展示的数据
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
```

### 属性说明
