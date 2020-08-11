import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DarumasGralPage } from './darumas-gral.page';

describe('DarumasGralPage', () => {
  let component: DarumasGralPage;
  let fixture: ComponentFixture<DarumasGralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarumasGralPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DarumasGralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
