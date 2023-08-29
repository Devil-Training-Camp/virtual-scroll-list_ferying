export function getDataList(): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = Array.from({ length: 10000 }, (x, i) => i).map((item) => {
        return {
          index: item,
          id: item + 1,
          name: `列表_${item}`,
          // content: ['测试iii']
          content: Array.from({ length: Math.ceil(Math.random() * 10) }, (x, i) => {
            return `这里是测试内容_${i}`;
          }),
        };
      });
      resolve(data);
    }, 1000);
  });
}

// export function getDataList(): any[]{
//     const data = Array.from({length: 100}, (x, i) => i).map(item=> {
//         return {
//             id: item + 1,
//             name: `列表_${item}`
//         }
//     });
//     return data;
// }
