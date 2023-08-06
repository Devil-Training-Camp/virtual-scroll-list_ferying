
// export function getDataList(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const data = new Array(10000).fill(0).map(item => {
//                 return {
//                     id: item + 1,
//                     name: `列表_${item}`
//                 }
//             });
//             resolve(data);
//         }, 1000);
//     });
// }

export function getDataList(): any[]{
    const data = Array.from({length: 100}, (x, i) => i).map(item=> {
        return {
            id: item + 1,
            name: `列表_${item}`
        }
    });
    return data;
}