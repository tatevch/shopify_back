import {
  Products, Variants, Customer, Address, Orders
} from '../models'

const models = {
  Products,
  Variants,
  Customer,
  Address,
  Orders

}

async function main () {
  // eslint-disable-next-line guard-for-in
  for (const i in models) {
    console.log(i)
    // eslint-disable-next-line no-await-in-loop
    await models[i].sync({ alter: true })
  }

  // eslint-disable-next-line no-undef
  process.exit(0)
}

main().catch(console.error)
