
let contador = 0;
let newArray = [];
let index = 0;

let arr = [1,3,5,7,40,50];


while (contador <= arr[arr.length - 1]) {

    if (arr[index] == contador) {
        index++;
        contador++;
    } else{
        newArray.push(contador)
        contador++;
    }
}

console.log(newArray)

