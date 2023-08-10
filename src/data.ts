
export function getDataList(): Promise<any[]>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = Array.from({length: 100}, (x, i) => i).map(item => {
                return {
                    index: item,
                    id: item + 1,
                    name: `列表_${item}`
                }
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