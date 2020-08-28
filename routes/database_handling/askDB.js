const payments = require('../payments/payments');
const database = require('../database_handling/connectionManager');

function count(array, value) {
  let countNum = 0;
  for(var i = 0; i < array.length; ++i){
      if(array[i] == value)
          countNum++;
  }
  return countNum;
}

let cmds = {
    categories : async () => {
      let rows = await database.rows(`SELECT * FROM "Categories"`)
      return rows
    },
    products : async (category) => {
      let rows = await database.rows(`SELECT * FROM "Products" WHERE "Category" = $1`, [category])
      return rows
    },
    categoryNameFromURL : async (category) => {
      let row = await database.rows(`SELECT * FROM "Categories" WHERE "URL" = $1`, [category]);
      return row.Display;
    },
    productFromPID : async (id) => {
      let row = await database.rows(`SELECT * FROM "Products" WHERE "PID" = $1`, [id]);
      console.log(row[0])
      return row[0];
    },
    productsFromPIDList : async (pidlist) => {
      pidlist = pidlist.splice(1);
      let rows = ""
      let params = [];
      for(let i = 1; i <= pidlist.length; i++) {
        params.push('$' + i);
      }
      if (pidlist != ""){
        console.log(pidlist)
        rows = await database.rows(`SELECT * FROM "Products" WHERE "PID" IN (${params})`, pidlist);
        rows.forEach(prod => {
          prod.Count = count(pidlist, prod.PID)
        })
      }
      return rows;
    },
    productPriceTotal : async (pidlist) => {
      if(pidlist == '00'){
        return {total: 0, products: []}
      }
      else{
        return new Promise((resolve, reject) => {
          cmds.productsFromPIDList(pidlist).then(prods => {
            let prodList = {total: 0, products: []};
            prods.forEach(prod => {
              let returnProduct = prod
              returnProduct.total = prod.Price * prod.Count
              prodList.total += returnProduct.total
              prodList.products.push(returnProduct)
            })
            resolve(prodList)
          })
        })
      }
    }
}

module.exports = cmds;