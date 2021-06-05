let arr = [20,1,-1,2,-2,3,3,5,5,1,2,4,20,4,-1,-2,5];

test = arr.filter((item,i,ar) => ar.indexOf(item) === i);
console.log(test);