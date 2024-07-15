// import fs from 'fs'
// import { utilService } from './util.service.js'

// const PAGE_SIZE = 5
// const toys = utilService.readJsonFile('data/toy.json')

// export const toyService = {
//   query,
//   get,
//   remove,
//   save,
// }

// function query(filterBy = {}, sortBy = {}, pageIdx) {
//   // console.log('filterBy:', filterBy)
//   console.log('sortBy:', sortBy)
//   let filteredToys = toys
//   console.log(toys);
//   if (filterBy.txt) {
//     const regExp = new RegExp(filterBy.txt, 'i')
//     filteredToys = filteredToys.filter(toy => regExp.test(toy.name))
//   }
//   if (filterBy.inStock) {
//     filteredToys = filteredToys.filter(
//       toy => toy.inStock === JSON.parse(filterBy.inStock)
//     )
//   }
//   if (filterBy.labels && filterBy.labels.length) {
//     filteredToys = filteredToys.filter(toy =>
//       filterBy.labels.every(label => toy.labels.includes(label))
//       // filterBy.labels.some(label => toy.labels.includes(label))
//     )
//   }
//   if (sortBy.type) {
//     filteredToys.sort((toy1, toy2) => {
//       const sortDirection = +sortBy.desc
//       if (sortBy.type === 'name') {
//         return toy1.name.localeCompare(toy2.name) * sortDirection
//       } else if (sortBy.type === 'price' || sortBy.type === 'createdAt') {
//         return (toy1[sortBy.type] - toy2[sortBy.type]) * sortDirection
//       }
//     })
//   }
//   if (pageIdx !== undefined) {
//     let startIdx = pageIdx * PAGE_SIZE
//     filteredToys = filteredToys.slice(startIdx, startIdx + PAGE_SIZE)
//   }
//   return Promise.resolve(filteredToys)
// }

// function get(toyId) {
//   const toy = toys.find(toy => toy._id === toyId)
//   if (!toy) return Promise.reject('Toy not found')
//   return Promise.resolve(toy)
// }

// function remove(toyId) {
//   const idx = toys.findIndex(toy => toy._id === toyId)
//   if (idx === -1) return Promise.reject('No such toy')
//   toys.splice(idx, 1)
//   return _saveToysToFile()
// }

// async function save(toy) {
//   try {
//     if (toy._id) {
//       const idx = toys.findIndex(currToy => currToy._id === toy._id)
//       if (idx < 0) {
//         throw new Error(`Toy with ID ${toy._id} not found`)
//       }
//       toys[idx] = { ...toys[idx], ...toy }
//     } else {
//       toy._id = _makeId()
//       toy.createdAt = Date.now()
//       toy.inStock = true
//       toys.unshift(toy)
//     }
//     await _saveToysToFile()
//     return toy
//   } catch (error) {
//     console.error('Error saving toy:', error)
//     throw error
//   }
// }


// function _makeId(length = 5) {
//   let text = ''
//   const possible =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length))
//   }
//   return text
// }

// function _saveToysToFile() {
//   return new Promise((resolve, reject) => {
//     const toysStr = JSON.stringify(toys, null, 4)
//     fs.writeFile('data/toy.json', toysStr, err => {
//       if (err) {
//         return console.log(err)
//       }
//       resolve()
//     })
//   })
// }
