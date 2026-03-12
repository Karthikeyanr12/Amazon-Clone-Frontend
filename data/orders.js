export const orders = JSON.parse(localStorage.getItem('Orders'))||[]

export function addOrders(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('Orders',JSON.stringify(orders))
}