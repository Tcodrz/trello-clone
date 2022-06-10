// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {SidebarService} from "../../../../apps/trello-clone/src/app/core/services/sidebar.service";

export type SidebarServiceMock = Partial<Record<keyof SidebarService, jest.Mock<SidebarService>>>;

export function createSidebarServiceMock(): SidebarServiceMock {
  return {
    getMenuLinks: jest.fn()
  };
}
