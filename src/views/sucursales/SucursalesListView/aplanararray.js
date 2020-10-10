const aplanararray = arr => {
  const arregloFinal = [];
  arr.forEach(element => {
    if (Array.isArray(element)) {
      arregloFinal.push(...element);
    } else {
      arregloFinal.push(element);
    }
  });

  return arregloFinal;
};

console.log(aplanararray([[1, 2], [[3, 4]], [1, []]]));
