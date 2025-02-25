import { TruncatePipe } from './tag-pipe.pipe';

describe('TruncatePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return undefined for empty array', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform([])).toBeUndefined();
  });

  it('should format single tag correctly', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform(['tag1'])).toBe('"tag1"');
  });

  it('should format multiple tags correctly', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform(['tag1', 'tag2', 'tag3'])).toBe('"tag1", "tag2", "tag3"');
  });
});
