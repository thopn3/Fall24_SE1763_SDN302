// Khai báo thư viện của MongoDB driver
const {MongoClient, ObjectId} = require("mongodb");

// Khái báo các thông số của MongoDB server
const url = "mongodb://127.0.0.1:27017";
const dbName = "SE1763_Test";

// Khởi tạo đối tượng CSDL cho ứng dụng
const client = new MongoClient(url);

// Thực thi kết nối và các hoạt động thao tác dữ liệu
async function main(){
    // Kết nối CSDL
    await client.connect();
    console.log("Connect to MongoDB successfully");
    // Xác định Tên CSDL, tên Collection cần làm việc
    const myDb = client.db(dbName);
    const myCollection = myDb.collection("departments");

    // CRUD:
    // Chèn vào 1 document mới
    const newDepart = {name: "IT", location: {floor: 1, room: "101"}};
    // await myCollection.insertOne(newDepart).then(newDoc => console.log(newDoc));

    // Chèn hơn 1 document
    await myCollection.insertMany([
        {name: "Marketing", location: {floor: 2, room: "201"}},
        {name: "Sale", location: {floor: 3, room: "301"}},
        {age: 10, address: "ABC"},
        {name: 1, location: null},
    ]);

    // Cập nhật
    await myCollection.updateOne(
        {_id: new ObjectId("66fe13b4954572256f463e08")}, 
        {$set: {name: "Information Technology", location: {floor: 2, room: "210"}}}
    );

    // Tìm kiếm
    const searchResult = await myCollection.find({"location.floor": 2}).toArray();
    // console.log(searchResult);

    // Xóa

    // await myCollection.deleteMany({"name": "Sale"});

    // Liệt kê các documents
    const listDepartments = await myCollection.find({}).toArray();
    console.log(listDepartments);

    return "Done!";
}

// Thực thi hoạt động cho ứng dụng
main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
