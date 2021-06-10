// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}


const pAequorFactory = (number, dnaArray) => {
  return {
    specimenNum : number,
    dna : dnaArray,
    mutate () {
      let randomBase = Math.floor(Math.random() * this.dna.length);
      let originBase = this.dna[randomBase];
      
      while (originBase === this.dna[randomBase]) {
        this.dna[randomBase] = returnRandBase();
      }
      },

    compareDNA (obj) {
      let commonPercentage;

      const counter = this.dna.reduce((acc, curr, idx, arr) => {
        if (arr[idx] === obj.dna[idx]) {
          return acc +=1;
        } else {
          return acc;
        }
      }, 0);
      // for (let i=0; i<obj.dna.length; i++) {
      //   if (this.dna[i] === obj.dna[i]) {
      //     counter +=1;
      //   }
      

      commonPercentage = (counter/obj.dna.length * 100).toFixed(2)
      console.log(`Specimen ${this.specimenNum} & specimen ${obj.specimenNum} have ${commonPercentage}% DNA in common`)

      return commonPercentage
    },

    willLikelySurvive () {
      let baseCounter = 0;
      let cgArray = [];

      cgArray = this.dna.filter(base => {
        return base === 'C' || base === 'G';
      })

      return cgArray.length / this.dna.length >= 0.6
    },

    complementaryStrand () {
      let complementaryDna = [];

      for (let i=0; i<this.dna.length; i++) {
        switch (this.dna[i]) {
          
          case 'A':
          complementaryDna[i] = 'T';
          break;
         
          case 'T':
          complementaryDna[i] = 'A';
          break;
         
          case 'C':
          complementaryDna[i] = 'G';
          break;
          
          case 'G':
          complementaryDna[i] = 'C';
          break;

          default:
          complementaryDna[i] = this.dna[i];
          break;
        }
      }

      return complementaryDna
    }

    }
  }


const idGenerator = () => {
  
  return Math.floor(10000000 + Math.random() * 90000000);

}

let pAequorHighChance = [];


while (pAequorHighChance.length < 30) {
  pAequorGenerated = pAequorFactory(idGenerator(), mockUpStrand())
  if (pAequorGenerated.willLikelySurvive()) {
  pAequorHighChance.push(pAequorGenerated)
  } 
}


// find best match
let bestProb = 0;

let bestMatch = pAequorHighChance.reduce((acc, currVal, idx) => {

  for (let i=0; i<pAequorHighChance.length; i++) {

    let comparison = 0;
    if (i !== idx) {
      comparison = currVal.compareDNA(pAequorHighChance[i])

      if (bestProb < comparison) {
        bestProb = comparison
        acc = {
          specimen_no1 : currVal.specimenNum,
          specimen_no2 : pAequorHighChance[i].specimenNum,
          matchInPercent : bestProb
        }
      }
    }
    
  }
  return acc

}, [])



// console.log(bestProb)
// console.log(bestMatch)


// console.log(pAequorHighChance.length)


// const test1 =  pAequorFactory(idGenerator(), mockUpStrand()) 
// const test2 =  pAequorFactory(idGenerator(), mockUpStrand()) 
// console.log(test1.dna)
// console.log(test2.dna)
// test1.compareDNA(test2)
// console.log(test1.complementaryStrand())
// console.log(test1.mutate())
// console.log(pAequorHighChance[0])
