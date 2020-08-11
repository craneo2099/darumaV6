import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CambioPassPage } from './cambio-pass.page';

describe('CambioPassPage', () => {
  let component: CambioPassPage;
  let fixture: ComponentFixture<CambioPassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioPassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CambioPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
