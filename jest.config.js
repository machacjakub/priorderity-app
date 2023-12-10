/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	roots: [ '<rootDir>' ],
	moduleNameMapper: {
		'^@/app/(.*)': '<rootDir>/app/$1',
	}
};