
class Is {
  constructor() {
    this.isUndefined = false;
    this.isDefined = false;
    this.isNull = false;
    this.isFalse = false;
  }

  evalUndefined = (obj) => {
    try {
      if (typeof obj !== 'undefined') {
        this.isDefined = true;
        this.isUndefined = false;
      } else {
        this.isDefined = false;
        this.isUndefined = true;
      }
    } catch (e) {
      this.isUndefined = true;
      this.isDefined = false;
    }
  }

  evalNull = (obj) => {
    if (obj === null && typeof obj === 'object') this.isNull = true;
    else this.isNull = false;
  }

  is = (obj) => {
    this.evalUndefined(obj);
    this.evalNull(obj);
    return this;
  }
}

const { is } = new Is();
export default is;
