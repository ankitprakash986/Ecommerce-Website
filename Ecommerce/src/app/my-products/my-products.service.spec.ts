import { TestBed } from '@angular/core/testing';

import { MyProductsService } from './my-products.service';

describe('MyProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyProductsService = TestBed.get(MyProductsService);
    expect(service).toBeTruthy();
  });
});
