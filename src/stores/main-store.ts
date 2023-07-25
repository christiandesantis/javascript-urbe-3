import { defineStore } from 'pinia'
import { Registry, Vehicle, Owner, OwnerDto, VehicleDto, RegistryDto } from '../components/models'
import { addDoc, collection, doc, setDoc, getDocs } from 'firebase/firestore'
import { db } from 'src/composables/firebase'

export const useMainStore = defineStore('main', {
  state: () => ({
    registries: [] as Registry[],
    owners: [] as Owner[],
    vehicles: [] as Vehicle[]
  }),
  getters: {
    // addOwner: (state) => state.counter * 2
  },
  actions: {
    async fetchOwners<T> (): Promise<T> {
      try {
        const ownersCollection = collection(db, 'owners')
        const ownersSnapshot = await getDocs(ownersCollection)
        this.owners = ownersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Owner))
        return Promise.resolve() as Promise<T>
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async createOwner<T> (data: OwnerDto): Promise<T> {
      try {
        const collectionsRef = collection(db, 'owners')
        const docRef = await addDoc(collectionsRef, data)
        this.owners.unshift({ id: docRef.id, ...data })
        return Promise.resolve() as Promise<T>
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async fetchVehicles<T> (): Promise<T> {
      try {
        const vehiclesCollection = collection(db, 'vehicles')
        const vehiclesSnapshot = await getDocs(vehiclesCollection)
        this.vehicles = vehiclesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Vehicle))
        return Promise.resolve() as Promise<T>
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async createVehicle<T> (data: VehicleDto): Promise<T> {
      try {
        const collectionsRef = collection(db, 'vehicles')
        const docRef = await addDoc(collectionsRef, data)
        this.vehicles.unshift({ id: docRef.id, ...data })
        return Promise.resolve() as Promise<T>
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async fetchRegistries<T> (): Promise<T> {
      try {
        const registriesCollection = collection(db, 'registries')
        const registriesSnapshot = await getDocs(registriesCollection)
        this.registries = registriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Registry))
        return Promise.resolve() as Promise<T>
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    },
    async createRegistry<T> (data: RegistryDto): Promise<T> {
      try {
        const collectionsRef = collection(db, 'registries')
        const docRef = await addDoc(collectionsRef, data)
        this.registries.unshift({ id: docRef.id, ...data })
        return Promise.resolve() as Promise<T>
      } catch (error) {
        console.log(error)
        return Promise.reject(error)
      }
    }

  }
})
