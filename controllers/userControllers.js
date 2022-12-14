const { Client, Order } = require("../models");

async function myAccount(req, res) {
  const client = Client.findByPk(req.auth.id);
  res.json(client);
}
async function udpateUser(req, res) {
  const client = await Client.findByPk(req.auth.userId);
  const verifyPassword = client.comparePassword(req.body.password);

  try {
    if (verifyPassword) {
      Client.update(
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.newPassword,
          address: req.body.address,
          phoneNumber: req.body.phoneNumber,
        },
        {
          where: { id: req.auth.userId },
        }
      );
      return res.status(200).json({ client });
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
}
async function orderFinded(req, res) {
  const orders = await Order.findAll({ where: { clientId: req.auth.userId } });

  if (!orders) {
    return res.status(404).json({ error: "The user has no purchases" });
  }

  return res.status(200).json(orders);
}

async function orderSend(req, res) {
  const client = await Client.findByPk(req.auth.userId);
  await Order.create({
    productList: req.body.productList,
    paymentMethod: "visa Crédito",
    address: client.address,
    clientId: req.auth.userId,
  });
  return res.status(200).json();
}

module.exports = {
  myAccount,
  udpateUser,
  orderFinded,
  orderSend,
};
