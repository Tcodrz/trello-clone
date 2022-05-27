// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {CacheService} from "../../../../apps/trello-clone/src/app/core/services/cache.service";

export type CacheServiceMock = Partial<Record<keyof CacheService, jest.Mock<CacheService>>>;

export function createCacheServiceMock(): CacheServiceMock {
  return {
    deleteItem: jest.fn(),
  };
}
