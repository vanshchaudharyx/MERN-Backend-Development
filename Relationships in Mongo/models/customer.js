const mongoose = require("mongoose");
const { Schema } = mongoose;
main()
  .then(() => console.log("Connected Successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationship");
}

//We take example of user and address for One to few relationship.

const orderSchema = new Schema({
  item: String,
  price: Number,
});
const Order = mongoose.model("Order", orderSchema);

const customerSchema = new Schema({
  name: String,
  order: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});
// customerSchema.pre("findOneAndDelete", async () => {
//   console.log("Pre middleware");
// });
// When this pre middleware triggers then post middleware auto trigger
customerSchema.post("findOneAndDelete", async (customer) => {
  console.log("Post middleware");
  // console.log(data);
  if (customer.order.length) {
    let result = await Order.deleteMany({ _id: { $in: customer.order } });
    console.log("Deleted Orders",result);
  }
});
const Customer = mongoose.model("Customer", customerSchema);

const addCustomer = async () => {
  let cust1 = new Customer({
    name: "Vansh",
  });
  let order1 = await Order.findOne({ item: "Chips" });
  let order2 = await Order.findOne({ item: "Choclate" });
  cust1.order.push(order1);
  cust1.order.push(order2);
  let result = await cust1.save();
  console.log(result);
};
// addCustomer();

const addOrders = async () => {
  let result = await Order.insertMany([
    {
      item: "Samosa",
      price: 12,
    },
    {
      item: "Chips",
      price: 10,
    },
    {
      item: "Choclate",
      price: 40,
    },
  ]);
  console.log(result);
};
// addOrders();

//Functions->
const addCust = async () => {
  let newCust = new Customer({
    name: "Karan Arjun",
  });
  let newOrder = new Order({
    item: "Burger",
    price: 250,
  });
  newCust.order.push(newOrder);
  await newOrder.save();
  await newCust.save();
  console.log("Added new customer");
};
// addCust();

const delCust = async () => {
  let data = await Customer.findByIdAndDelete("6ab3f7ece18207468b56da37"); //This only delete the customer not the order.
  console.log("Deleted Customer",data);
  // There is no middleware for findByIdAndDelete but findOneAndDelete exists and this itself is a middleware
  // So if findbyIdAndDelete trigers findOneAndDelete then modngoose middleware automatically triggers.
};

delCust();
