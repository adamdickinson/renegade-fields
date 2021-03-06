import * as helpers from "./validate"



describe("validate helpers", () => {
  
  const sampleName = "client.age"
  const sampleTypeName = "client.phone"
  const sampleTypeValue = "123"
  const sampleValue = "28"



  it("should validate", () => {

    // No rules
    expect(helpers.validate(sampleName, sampleValue))
      .toBe(undefined)

    // Passes all rules
    expect(helpers.validate(sampleName, sampleValue, { required: true }))
      .toBe(undefined)

    // Fails a rule 
    expect(helpers.validate(sampleName, sampleValue, { required: true, max: 25}))
      .toBe("Must be 25 or less")

    // Validates a 'type' rule
    expect(helpers.validate(sampleTypeName, sampleTypeValue, { type: "tel" }))
      .toBe("Must be a valid phone number")

    // Runs a custom rule
    expect(helpers.validate(
      sampleName, 
      sampleValue, 
      { customRule: "28" }, 
      { customRule: (value, constraint) => value === constraint ? "Custom rule passed" : undefined }
    )).toBe("Custom rule passed")

  })  



  it("should check isEmpty", () => {
    const empties = ["", {}, []]
    for( let empty of empties )
      expect(helpers.isEmpty(empty)).toBe(true)

    const nonEmpties = ["Adam", 124, 0]
    for( let nonEmpty of nonEmpties )
      expect(helpers.isEmpty(nonEmpty)).toBe(false)
  })



  it("should validate abn", () => {
    const validABNs = ["12 345 678 901", "01928374659"]
    for( let validABN of validABNs )
      expect(helpers.defaultValidators.abn(validABN)).toBe(undefined)

    const invalidABNs = ["12 34e 678 901", "0192837465", "019283746501"]
    for( let invalidABN of invalidABNs )
      expect(helpers.defaultValidators.abn(invalidABN)).toBe("Must be a valid ABN")
  })



  it("should validate email", () => {
    const validEmails = ["adam@renegade.digital", "adam.dickinson@hotmail.co.nz"]
    for( let validEmail of validEmails )
      expect(helpers.defaultValidators.email(validEmail)).toBe(undefined)

    const invalidEmails = ["awesome", 12, "&*HIKASHC"]
    for( let invalidEmail of invalidEmails )
      expect(helpers.defaultValidators.email(invalidEmail)).toBe("Must be a valid email address")
  })



  it("should validate max", () => {
    const validMaxes = [99.9999, 100, 12, -100, -10000]
    for( let validMax of validMaxes )
      expect(helpers.defaultValidators.max(validMax, 100)).toBe(undefined)

    const invalidMaxes = [101, 100.000000001, 129801, "adam"]
    for( let invalidMax of invalidMaxes )
      expect(helpers.defaultValidators.max(invalidMax, 100)).toBe("Must be 100 or less")
  })



  it("should validate min", () => {
    const validMins = [100, 101, 100.000000001, 129801]
    for( let validMin of validMins )
      expect(helpers.defaultValidators.min(validMin, 100)).toBe(undefined)

    const invalidMins = [99.9999, 99, 12, -100, -10000, "adam"]
    for( let invalidMin of invalidMins )
      expect(helpers.defaultValidators.min(invalidMin, 100)).toBe("Must be 100 or greater")
  })



  it("should validate postcode", () => {
    const validPostcodes = ["3152", "0212", "0800", "9934"]
    for( let validPostcode of validPostcodes )
      expect(helpers.defaultValidators.postcode(validPostcode)).toBe(undefined)

    const invalidPostcodes = ["0199", "0642", "12345", "332", "adam"]
    for( let invalidPostcode of invalidPostcodes )
      expect(helpers.defaultValidators.postcode(invalidPostcode)).toBe("Must be valid postcode")
  })



  it("should validate required", () => {
    const validRequireds = [0, "awesome", { a: true }, true, [false]]
    for( let validRequired of validRequireds )
      expect(helpers.defaultValidators.required(validRequired)).toBe(undefined)

    const invalidRequireds = ["", null, undefined, {}, []]
    for( let invalidRequired of invalidRequireds )
      expect(helpers.defaultValidators.required(invalidRequired)).toBe("Must enter a value")
  })



  it("should validate tel", () => {
    const validTels = ["0400112233", "7766 5544", "03 8888 9999", "03 6666 5555", "+61 400 112 233", "(03) 7777 4444"]
    for( let validTel of validTels )
      expect(helpers.defaultValidators.tel(validTel)).toBe(undefined)

    const invalidTels = ["04001122333", "@9800 1122"]
    for( let invalidTel of invalidTels )
      expect(helpers.defaultValidators.tel(invalidTel)).toBe("Must be a valid phone number")
  })

})
