let Apipath;
if (process.env.NODE_ENV !== "production") {
    Apipath = "http://localhost:9000/api/v1"
} else {
    Apipath = "http://api.websyksy2018-16.course.tamk.cloud/api/v1"
}
export default Apipath;