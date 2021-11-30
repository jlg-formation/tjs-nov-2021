"use strict";

console.log("start");
console.log("this: ", this);

function toto() {
  console.log("this: ", this);
  console.log("window: ", window);
}

toto();

const object = {
  truc: toto,
};

console.log("start truc");
object.truc();

console.log("start again truc");
object.truc.bind(123)();

const $ = document.querySelector.bind(document);

$("body");
console.log('$("body"): ', $("body"));

const titi = new toto();
console.log("titi: ", titi);
