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
	constructor(
		protected key: IKey,
		private tenants: Array<Person>,
		protected door: boolean
	) {}
	comeIn(person: Person): Array<Person> {
		return this.door ? (this.tenants = [...this.tenants, person]) : this.tenants
	}

	getTenants(): Array<Person> {
		return this.tenants
	}

	abstract openDoor(key: number): void
}

class MyHouse extends House {
	openDoor(key: number): void {
		if (this.key.getSignature() === key) {
			this.door = true
		}
	}
}

const key = new Key()

const house = new MyHouse(key, [], false)
const person = new Person(key)

house.openDoor(person.getKey().getSignature())

house.comeIn(person)
console.log(house.getTenants())

export {}
