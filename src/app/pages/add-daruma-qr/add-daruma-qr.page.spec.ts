import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDarumaQrPage } from './add-daruma-qr.page';

describe('AddDarumaQrPage', () => {
  let component: AddDarumaQrPage;
  let fixture: ComponentFixture<AddDarumaQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDarumaQrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDarumaQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
