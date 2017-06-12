import * as utils from './utils'

describe('utils', () => {
  describe('findMissing', () => {
    it('should not find the missing index', () => {
      const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      expect(utils.findMissing(data)).toEqual(null)
    })

    it('should find the missing index in the middle of a dataset', () => {
      const data = [1, 2, 3, 4, 6, 7, 8, 9, 10]
      expect(utils.findMissing(data)).toEqual(5)
    })

    it('should find the missing index at the beginning of the dataset', () => {
      const data = [2, 3, 4, 5, 6, 7, 8, 9, 10]
      expect(utils.findMissing(data)).toEqual(1)
    })

    it('should find the missing index at the beginning of a 0-based dataset', () => {
      const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      expect(utils.findMissing(data, 0)).toEqual(0)
    })

    it('should find the missing index near the end of the dataset', () => {
      const data = [1, 2, 3, 4, 5, 6, 7, 9]
      expect(utils.findMissing(data)).toEqual(8)
    })
  })

  describe('findBestNextIndex', () => {
    it('should find the best next index in an array of one missing value', () => {
      const data = [
        { index: 1 },
        { index: 3 },
        { index: 4 }
      ]
      expect(utils.findBestNextIndex(data, 'index')).toEqual(2)
    })
    it('should find the best next index in an array of n missing values', () => {
      const data = [
        { index: 1 },
        { index: 2 },
        { index: 5 },
        { index: 7 },
        { index: 9 },
        { index: 10 }
      ]
      expect(utils.findBestNextIndex(data, 'index')).toEqual(3)
    })
  })
})
