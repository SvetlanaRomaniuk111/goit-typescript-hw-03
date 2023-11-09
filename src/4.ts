interface IKey {
	getSignature: () => number
}
interface IPerson {
	getKey: () => Key
}

class Key implements IKey {
	private signature = Math.random()
	getSignature(): number {
		return this.signature
	}
}

class Person implements IPerson {
	constructor(private key: Key) {}

	getKey(): Key {
		return this.key
	}
}

abstract class House {
	constructor(protected tenants: Array<Person>, protected door: boolean) {}
	comeIn(person: Person): Array<Person> {
		return this.door ? (this.tenants = [...this.tenants, person]) : this.tenants
	}

	abstract openDoor(key: Key): void
}

class MyHouse extends House {
	openDoor(key: Key): void {
		if (this.key.getSignature() === key.getSignature()) {
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

export {}
