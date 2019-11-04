import mongoose from "mongoose";
mongoose.connect("mongodb+srv://admin:admin123456@sso-5sunc.mongodb.net/sso?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
    .once("open", () => {
        console.log("Good to go");
    })
    .on("error", error => console.warn("Warning", error));

export default mongoose;
