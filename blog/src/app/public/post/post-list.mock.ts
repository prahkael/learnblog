// *****************************************************************************
// Imports
// *****************************************************************************

// *****************************************************************************
// Mock values
// *****************************************************************************

// *****************************************************************************
// Mock functions
// *****************************************************************************

export function createMockedPosts() {
  const min = 4, max = 12;
  const ran = min + Math.floor(Math.random() * (max - min));
  const arrPosts = [];

  Array.apply(0, { length: ran }).forEach(() =>
      arrPosts.push(createMockedPost()));

  return arrPosts;
}

// *****************************************************************************

export function createMockedPost() {
  const arrPostName = ['somePostNameOne', 'somePostNameTwo', 'somePostNameThree'];
  const arrAuthor   = ['someAuthroOne', 'someAuthorTwo', 'someAuthorThree'];
  const arrPostBody = [
    'Minions ipsum hana dul sae gelatooo uuuhhh para tú butt.'
    + 'Chasy belloo! Tulaliloo poulet tikka masala underweaaar baboiii tatata bala tu bappleees.'
    + 'La bodaaa chasy underweaaar tank yuuu! Chasy bananaaaa potatoooo uuuhhh. Hahaha poopayee '
    + 'bee do bee do bee do butt tulaliloo jeje hahaha ti aamoo! Butt. Ti aamoo!'
    + 'jiji gelatooo pepete hahaha la bodaaa bappleees.',
    'Minions ipsum sed me want bananaaa! Poopayee incididunt veniam minim.'
    + 'Reprehenderit ullamco dolor bananaaaa gelatooo me want bananaaa'
    + 'Aaaaaah ut commodo. Ti aamoo! occaecat baboiii duis sed ut jiji aliquip sed'
    + 'Aliquip aaaaaah exercitation magna ut hana dul sae nostrud jeje hahaha.'
    + 'Occaecat aaaaaah tank yuuu! Para tú officia duis.'
    + 'Poulet tikka masala officia irure sit amet hana dul sae et nostrud poopayee aliqua underweaaar.',
    'Lorem ipsum dolor sit amet, mel nemore equidem an, cum ut tempor vidisse ornatus.'
    + 'Pri no dico mutat apeirian, sea cu errem propriae, esse elaboraret vis ei.'
    + 'Falli civibus qui ne, vis quando offendit ei. Recusabo mediocrem pri at, et mea omnes tation dissentias.'
    + 'Te est illud illum.'];

  const objPost: any     = {};
  objPost.name      = getRandomValue(arrPostName);
  objPost.author    = getRandomValue(arrAuthor);
  objPost.postBody  = getRandomValue(arrPostBody);

  return objPost;
}

// *****************************************************************************

export function createMockedObjectId(m = Math, d = Date, h = 16) {
  const s  = s1 => m.floor(s1).toString(h);
  const id = s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

  return id;
}

// *****************************************************************************

export function getRandomValue(arrValues) {
  return arrValues[Math.floor(Math.random() * arrValues.length)];
}
