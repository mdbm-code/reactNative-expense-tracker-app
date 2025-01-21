function wrapperFunction(originalFunction) {
  return function (...args) {
    console.log('Перед вызовом функции');
    const result = originalFunction(...args);
    console.log('После вызова функции');
    return result;
  };
}

function sayHello(name) {
  return `Hello, ${name}!`;
}

//   const wrappedSayHello = wrapperFunction(sayHello);

//   console.log(wrappedSayHello('Alice'));
