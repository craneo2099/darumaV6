import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InicioLoginPage } from './inicio-login.page';

describe('InicioLoginPage', () => {
  let component: InicioLoginPage;
  let fixture: ComponentFixture<InicioLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioLoginPage ],
      imports: [
        IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
