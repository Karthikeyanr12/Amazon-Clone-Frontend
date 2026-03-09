class Car{
    #brand;
    #model;
    speed=0;
    isTrunkOpen=false;
    constructor(brand,model)
    {
        this.#brand=brand;
        this.#model=model;
    }
    displayInfo()
    {
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h Trunk: ${this.isTrunkOpen?'is Open':'is Closed'}`)
    }
    go()
    {
        if(this.isTrunkOpen)
        {
            console.log("Trunk is Open");
            return;
        }
        else{
            this.speed+=5;
            if(this.speed>200)
                this.speed=200
        }
        
    }
    break()
    {
        this.speed-=5;
        if(this.speed<0)
            this.speed=0
    }
    openTrunk()
    {
        this.isTrunkOpen=true;
    }
    closeTrunk()
    {
        this.isTrunkOpen=false
    }

}


class RaceCar extends Car{
    acceleration;
    constructor(brand,model,acceleration)
    {
        super(brand,model)
        this.acceleration=acceleration;
    }
    go()
    {
        this.speed+=this.acceleration;
        if(this.speed>300)
            this.speed=300;
    }
    openTrunk()
    {
        console.log("Race cars do not have a trunk");
    }
    closeTrunk()
    {
        console.log("Race cars do not have a trunk");
    }
    displayInfo()
    {
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`)
    }
}






const toyota=new Car('Toyota','Corolla')
const tesla=new Car('Tesla','Model 3');
console.log(toyota);
console.log(tesla);
toyota.openTrunk();
toyota.closeTrunk();
toyota.go();
toyota.go();
toyota.go();
toyota.go();
toyota.break();
toyota.displayInfo();
tesla.displayInfo();

const mcLaren=new RaceCar('McLaren','F1',30);
console.log(mcLaren);
mcLaren.go();
mcLaren.go();
mcLaren.break();
mcLaren.displayInfo();