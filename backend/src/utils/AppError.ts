export class AppError extends Error {
  status: number;
  error: {};

  constructor(message: string, status = 500, error: {}) {
    super(message);
    this.status = status;
    this.name = "AppError";
    this.error = error;
    Error.captureStackTrace(this, this.constructor);
  }
}

//CLASS
//class Animal {
// name: string;
// type: string;

//   constructor(name: string, type: string){
//     this.name = name;
//     this.type = type;
//   }
// }

//SETTING ObJ TO CLASS(CREATING INSTANCE)
// const dog = new Animal("brownie", "dog")
// dog.name //brownie
// SETS BROWNIE AND DOG TO DOG INSTANCE OF ANIMAL

//HOW DO WE EXTEND ANIMAL CLASS;
// class AnimalExpertise extends Animal {
//   expertiese: string; //setting a new prop (like name and type)

//   constructor(name: string, type: string, expertiese: string){
//     super(name, type); //THIS CALLS THE PARENT CLASS CONSTRUCTOR AND SETS NAME AND TYPE
//     this.expertiese = expertiese //THIS SETS THE EXTENDED CLASS PROP TO STRING WE PASS WHILE CALLING ITS CONSTRUCOT
//   };
// }

//SETTING INSTANCE/OBJ OF EXTENDED CLASS
// const dog2 = new AnimalExpertise("fluffy", "dog", "barking")
//THIS SETS THE PARENT CLASS PROPS AND THEN BARKING TO EXTENDED CLASS PROPS
