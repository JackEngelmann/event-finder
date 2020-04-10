import { DbScript } from '../../../../databaseConfig'
import { validateUniqScriptNames } from './applyDbScripts'

describe('validateUniqNames', () => {
    test('should do nothing when names are uniq', () => {
        const testScripts: DbScript[] = [
            {
                name: '1',
                async up() {},
            },
            {
                name: '2',
                async up() {},
            },
        ]
        validateUniqScriptNames(testScripts)
    })
    test('should throw eror when script name is used twice', () => {
        const testScripts: DbScript[] = [
            {
                name: '1',
                async up() {},
            },
            {
                name: '2',
                async up() {},
            },
            {
                name: '2',
                async up() {},
            },
        ]
        expect(() => validateUniqScriptNames(testScripts)).toThrow()
    })
})
