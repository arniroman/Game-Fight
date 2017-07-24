interface FighterInterface {
    name: string;
    power: number;
    health: number;
    setDamage:(damage: number)=>void;
    hit:(enemy: Fighter, point: number)=>void;
    doubleHit ?:(enemy: Fighter, point: number) => void;
}

class Fighter implements FighterInterface{
      name : string;
     power:  number;
     health:  number;

    constructor( name, power = 15, health = 1000) {
        this.name = name;
        this.power = power;
        this.health = health;
    }

    public setDamage(damage): void {
        this.health -= damage;

        if (this.health > 0) {
            console.log(`Health : ${this.health}  ${this.name}`);
        } else {
            this.health = 0;
            console.log(`Health : ${this.health}  ${this.name}`);
            return;
        }
    }

    public hit(enemy, point): void {
        const damage = point * this.power;
        enemy.setDamage(damage);
    }
}


class ImprovedFighter extends Fighter {
    doubleHit(enemy:FighterInterface, point) {
        super.hit(enemy, point *= 2);
    }
}


let fighter  = new Fighter('Bogdan', 15,1500);
let improvedFighter = new ImprovedFighter('Artem', 14,1400);

class Fighting {
    public fight = (fighter, improvedFighter, ...rest: number []) => {

        let flag = true;
        let repeatPoint = true;

        if (rest.length == 0) {
            rest = [20, 10, 15, 4];
            console.log(`the number of points equals zero. Added four points by default: dafault ${rest}`);
        }


        while (repeatPoint) {

            for (let elem of rest) {

                if (flag) {
                    fighter.hit(improvedFighter, elem);
                } else {
                    improvedFighter.doubleHit(fighter, elem);
                }

                if (improvedFighter.health <= 0 || fighter.health <= 0) {

                    let result = flag ? fighter.name : improvedFighter.name;
                    repeatPoint = false;
                    return console.log(result += ' winner ');
                }
                flag = !flag;
            }
        }
    }
}

new Fighting().fight(fighter, improvedFighter,12,11,14);