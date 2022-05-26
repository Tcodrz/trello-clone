import {CacheService} from "../core/services/cache.service";

export type CacheServiceMock = Partial<Record<keyof CacheService, jest.Mock<CacheService>>>;

export function createCacheServiceMock(): CacheServiceMock {
  return {
    deleteItem: jest.fn(),
  };
}
