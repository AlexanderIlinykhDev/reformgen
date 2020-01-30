import { getObjectFromForm } from '../internal-path-handler'

test('should return an object that matches the schema', () => {
  const mockJSONSchema = {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      address: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
          },
          street: {
            type: 'string',
          },
          streetNumber: {
            type: 'integer',
          },
        },
      },
    },
  }
  const mockData = {
    '#/firstName': 'Jane',
    '#/lastName': 'Doe',
    '#/address/city': 'RJ',
    '#/address/street': 'Praia de Botafogo',
    '#/address/streetNumber': 300,
  }

  const testResult = getObjectFromForm(mockJSONSchema, mockData)

  expect(testResult).toEqual(
    expect.objectContaining({
      firstName: 'Jane',
      lastName: 'Doe',
      address: expect.objectContaining({
        city: 'RJ',
        street: 'Praia de Botafogo',
        streetNumber: 300,
      }),
    })
  )
})