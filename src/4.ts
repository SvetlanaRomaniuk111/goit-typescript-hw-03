interface IKey {
	getSignature: () => number
}
interface IPerson {
	getKey: () => number
}

class Key implements IKey {
	private signature = Math.random()
	getSignature() {
		return this.signature
	}
}

class Person implements IPerson {
	constructor(private key: Key) {}

	getKey(): number {
		return this.key.getSignature()
	}
}

abstract class House {
	door: boolean = false
	key: IKey
	tenants: Array<Person>
	comeIn(person: Person): Array<Person> {
		return this.door ? (this.tenants = [...this.tenants, person]) : this.tenants
	}

	abstract openDoor(key: number): void
}

class MyHouse extends House {
	constructor(key: IKey) {
		super()
		this.key = key
		this.tenants = []
		this.door = super.door
		this.comeIn = (person) => super.comeIn(person)
	}

	openDoor(key: number): void {
		if (this.key.getSignature() === key) {
			this.door = true
		}
	}

	getTenants(): Array<Person> {
		return this.tenants
	}
}

const key = new Key()
const house = new MyHouse(key)
const person = new Person(key)
house.openDoor(person.getKey())
house.comeIn(person)
console.log(house.getTenants())
