// Case 1: Định nghĩa 2 thành phần trong module
// exports.area = (x, y) => x * y;
// exports.perimeter = (x , y) => 2 * (x + y);

// Case 2: Định nghĩa các thành phần trong module theo cách 2
// function area(x, y){
//     return x * y;
// }

// function perimeter(x, y){
//     return 2 * (x + y);
// }

// module.exports = {area, perimeter};

/** --------------- ASYNCHRONOUS ------------ */
// Method 1: Sử dụng Callback
// function CalcRectangle(x, y, callback){
//     if(x <= 0 || y <= 0)
//         setTimeout(() => callback(new Error("Các cạnh HCN phải > 0"), null), 2000);
//     else
//         setTimeout(() => callback(null, {
//             area: () => x * y,
//             perimeter: () => 2 * (x + y)
//         }), 2000);
// }

// module.exports = CalcRectangle;

// Method 2: Sử dụng đối tượng Promise thay thế cho callback function (phức tạp)
// function CalcRectangle(x, y){
//     return new Promise((resolve, reject) => {
//         if(x <= 0 || y <= 0)
//             reject("Các cạnh HCN phải > 0");
//         else
//             resolve({area: x * y, perimeter: 2 * (x + y)});
//     });
// }
// module.exports = CalcRectangle;

// Method 3: Sử dụng async/ await
const CalcRectangleAsync = async (x, y) => {
    if(x<=0 || y<=0)
        throw new Error("Các cạnh HCN phải > 0");
    else
        return {perimeter: 2 * (x+y), area: x*y};
}

module.exports = CalcRectangleAsync;