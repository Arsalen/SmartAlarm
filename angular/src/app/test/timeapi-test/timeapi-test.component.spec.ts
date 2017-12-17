/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimeapiTestComponent } from './timeapi-test.component';

describe('TimeapiTestComponent', () => {
  let component: TimeapiTestComponent;
  let fixture: ComponentFixture<TimeapiTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeapiTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeapiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
