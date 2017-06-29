let array = [52, 273, 32, 65, 103];
console.log(array);
console.log(array.length);
console.log(array[1000]);

let start = new Date().getTime();
let count = 0;
while(start + (1000+ 3) > new Date().getTime()){
  count++
}
console.log(start);
console.log(start + (1000* 3));
console.log(count + "만큼 반복했습니다.");

let array2 = ['사과','배','포도','딸기','바나나'];
for (let i in array2){
  console.log(`${i}번째 요소 :${array2[i]}`);
}

console.log("----------------- 구분선 -----------");

for (let item of array2){
  console.log(item);
}
