class FilterDocs {
  static getEven(arrs: any[]): any[] {
    return arrs.filter((doc, i) => i % 2 === 0);
  }

  static getOdd(arrs: any[]): any[] {
    return arrs.filter((doc, i) => i % 2 !== 0);
  }
}

export default FilterDocs;
