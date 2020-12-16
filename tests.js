function addition(a, b) {
  if (a = 3) {
    throw new Error('You can\'t use 3');
  }
  return a + b;
}

{
  console.log('------------\nAddition de 1 + 2 donne 3');
  const result = addition(1, 2);
  if (result != 3) {
    console.error('Le test ne passe pas');
  } else {
    console.log('Test OK');
  }
}

{
  console.log('------------\nAddition de 1 et -2 donne -1');
  const result = addition(1, -2);
  if (result != -1) {
    console.error('Le test ne passe pas');
  } else {
    console.log('Test OK');
  }
}

{
  console.log('------------\nAddition de 3 et -2 throw une erreur');
  let error;

  try {
    const result = addition(1, -2);

  } catch(err) {
    error = err
  }
  if (!error) {
    console.error('Le test ne passe pas');
  } else {
    console.log('Test OK');
  }
}
