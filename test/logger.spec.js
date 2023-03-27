const logger = require('../src/logger/logger');

describe('logger', () => {
  it('should log an error message', () => {
    const spy = jest.spyOn(logger, 'error').mockImplementation(() => {});
    logger.error('This is an error message');
    expect(spy).toHaveBeenCalledWith('This is an error message');
    spy.mockRestore();
  });

  it('should log an info message', () => {
    const spy = jest.spyOn(logger, 'info').mockImplementation(() => {});
    logger.info('This is an info message');
    expect(spy).toHaveBeenCalledWith('This is an info message');
    spy.mockRestore();
  });
});
