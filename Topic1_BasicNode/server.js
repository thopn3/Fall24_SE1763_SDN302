// const rect = {
//     area: (x, y) => x * y,
//     perimeter: (x, y) => 2 * (x + y)
// };

// Import module "rectangle"
const rect = require("./rectangle");

// function SolveRectangle(l, w){
//     if(l <= 0 || w <= 0)
//         console.log("Các cạnh của HCN phải lớn hơn hơn 0");
//     else{
//         console.log("Diện tích HCN = " + rect.area(l, w));
//         console.log("Chu vi HCN = " + rect.perimeter(l, w));
//     }
// }

// Sử dụng callback để mô tả quá trình xử lý theo cơ chế bất đồng bộ (Asynchronous)
// function SolveRectangle(l, w){
//     rect(l, w, (err, result) => {
//         if(err)
//             console.log(`Error: ${err.message}`);
//         else{
//             console.log(`Diện tích HCN là: ${result.area()}`);
//             console.log(`Chu vi HCN là: ${result.perimeter()}`);
//         }
//     })
// }

// // Test
// SolveRectangle(20, 10);
// SolveRectangle(-20, 10);
// SolveRectangle(20, -10);
// SolveRectangle(30, 5);

// Call Promise function
// rect(20, 10)
//     .then(({area, perimeter}) => {
//         console.log(`Diện tích HCN = ${area}`);
//         console.log(`Chu vi HCN = ${perimeter}`);
//     })
//     .catch(err => console.log(err));

async function SolveRectangle(l, w){
    try {
        const {perimeter, area} = await rect(l, w);
        console.log(`Chu vi HCN = ${perimeter}`);
        console.log(`Diện tích HCN = ${area}`);
    } catch (error) {
        console.log(`Lỗi: ${error.message}`);
    }
}

// Test: Giả lập hoạt động call từ nhiều clients
SolveRectangle(20, 10);
SolveRectangle(-20, 10);
SolveRectangle(20, -10);
SolveRectangle(30, 5);