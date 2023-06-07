let paymentData =[]
module.exports={
    addPaymentData:(data)=>{
        paymentData.push(data)
    },
    removePaymentData:(UserId)=>{
        paymentData = paymentData.filter(data=>data.userId!==UserId)
    },
    getPayment:(UserId)=>{
        return paymentData.find((data)=>data.userId===UserId)
    }
}