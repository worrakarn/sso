import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/sso?retryWrites=false", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
    .once("open", () => {
        console.log("Good to go");
    })
    .on("error", error => console.warn("Warning", error));

export default mongoose;
