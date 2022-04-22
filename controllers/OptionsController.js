import Options from "../models/Options";

class OptionsController{
  static createOptions =async (req,res,next)=>{
    const {name,value,position}=req.body;
    try{
      await Options.create({
        name,
        value,
        position,
      });
      res.json({
        status:'ok',

      })
    }catch (e) {
      next(e);
    }
  }
}
export default OptionsController
/*
id: 42864956440799,
      product_id: 7666437325023,
      title: '50 / grey / wool',
      price: '47000.00',
      sku: 'S-20',
      position: 1,
      inventory_policy: 'deny',
      compare_at_price: null,
      fulfillment_service: 'manual',
      inventory_management: 'shopify',
      option1: '50',
      option2: 'grey',
      option3: 'wool',
      inventory_item_id: 44959745310943,
      inventory_quantity: 1,
      old_inventory_quantity: 1,
      requires_shipping: true,
      admin_graphql_api_id: 'gid://shopify/ProductVariant/42864956440799'*/
