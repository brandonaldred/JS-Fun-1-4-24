let string = 'samurai';
let ending = ':-($/';

solution(string,ending);

function solution(str,end) {
    console.log(str + ' ' + end);
    let regex = new RegExp('(' + '\\' + end + '$' + ')');
    console.log( regex.test(str) );
}