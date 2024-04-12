interface CustomErrorOptions {
  message: string;
  uid?: string;
  success?: any;
  path?: string;
  miniPath?: string;
}

export class CustomError extends Error {
  success?: any;
  path?: any;
  miniPath?: any;
  uid?: string;

  constructor(options: CustomErrorOptions) {
    super(options.message);
    this.name = 'CustomError';
    this.success = options.success;
    this.path = options.path;
    this.miniPath = options.miniPath;
    this.uid = options.uid;
  }
}
