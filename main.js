function printReceipt(barcodes) {
    var barcodeCountMap = countQuantity(barcodes);

    var barcodeDetail = analyzeBarcode(barcodeCountMap);
    
    // var eachPrice = getEachGoodsPrice(goodsList);
    
    var totalPrice = countTotalCost(barcodeDetail);
    
    var theReceipt = formattedData(barcodeDetail, totalPrice);
    console.log(theReceipt);

//     console.log(`
// ***<store earning no money>Receipt ***
// Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan)
// Name: Sprite, Quantity: 2, Unit price: 3 (yuan), Subtotal: 6 (yuan)
// Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
// ----------------------
// Total: 23 (yuan)
// **********************`)
}


// var barcodes = [
//     'ITEM000000',
//     'ITEM000000',
//     'ITEM000000',
//     'ITEM000000',
//     'ITEM000000',
//     'ITEM000001',
//     'ITEM000001',
//     'ITEM000004'
// ];

var database = [
    {
       barcode: 'ITEM000000',
       name: 'Coca-Cola',
       price: 3
     },
     {
       barcode: 'ITEM000001',
       name: 'Sprite',
       price: 3
     },
     {
       barcode: 'ITEM000002',
       name: 'Apple',
       price: 5
     },
     {
       barcode: 'ITEM000003',
       name: 'Litchi',
       price: 15
     },
     {
       barcode: 'ITEM000004',
       name: 'Battery',
       price: 2
     },
     {
       barcode: 'ITEM000005',
       name: 'Instant Noodles',
       price: 4
     }
 ]

// function countQuantity(barcodes){
//         return barcodes.reduce(function(barcode,count){
//             if(count in barcode){
//                 barcode[count]++;
//             }else{
//                 barcode[count] = 1;
//             }
//             return barcode;
//         },{});
//     };


function countQuantity(barcodes){
    var barcodeCountMap = new Map();
    
    for(var i=0;i<barcodes.length;i++){
        if(barcodeCountMap.has(barcodes[i])){
            var number = barcodeCountMap.get(barcodes[i]);
            barcodeCountMap.set(barcodes[i],number+1);
        }else{
            barcodeCountMap.set(barcodes[i],1);
        }   
    }
    return barcodeCountMap;
}
    
    function analyzeBarcode(barcodeCountMap){
        var barcodeDetail =[];
        for(var[key,value] of barcodeCountMap){
            for(var i=0;i<database.length;i++){
                if(database[i].barcode == key){
                    var barcodeInfo = {
                        barcode:database[i].barcode,
                        name:database[i].name,
                        quantity:value,
                        unitPrice:database[i].price,
                        subtotal:value*database[i].price
                    }
                    
                    barcodeDetail.push(barcodeInfo); 
                }
            }
        }
        return barcodeDetail; 
    }

    function countTotalCost(barcodeDetail){
        var sum = 0;
        for(var i=0;i<barcodeDetail.length;i++){
            sum += barcodeDetail[i].subtotal;
        }
        return sum;
    }

    function formattedData(barcodeDetail,sum){
        var head = "\n***<store earning no money>Receipt ***\n";
        var body ="";
        for(var i = 0;i<barcodeDetail.length;i++){
            body+="Name: "+barcodeDetail[i].name +", Quantity: "+barcodeDetail[i].quantity+", Unit price: "+barcodeDetail[i].unitPrice+" (yuan), Subtotal: "+barcodeDetail[i].subtotal+" (yuan)\n";

        }
        var food="----------------------\n"+"Total: "+sum+" (yuan)\n**********************";
        var totalShow=head+body+food;
        return totalShow;
    }

module.exports = {
    printReceipt
};