"use strict";

function toto({ truc, trac }, nbr) {
  console.log("trac: ", trac);
  console.log("truc: ", truc);
  console.log("nbr: ", nbr);
  console.log("arguments: ", arguments);
}

toto({ truc: 123, trac: 56 }, 1234, false);

const [a, b] = [34, 67];
console.log("a: ", a);
console.log("b: ", b);
